import os
import sys
import json
import uuid
import flask
import base64
import spotipy

from flask import Flask, redirect, url_for, session, request
from flask import Flask,render_template,url_for,request,redirect, make_response
from flask import Flask, render_template, make_response
from flask_dance.contrib.github import make_github_blueprint, github
from flask_oauthlib.client import OAuth, OAuthException
from flask_pymongo import PyMongo
from flask_mongoengine import MongoEngine
from flask_cors import CORS

from services.services import Services
from pages.about import About
from pages.login import Login
from pages.database import Database
from pages.settings import Settings
from pages.status import Status
from pages.mail import Mail
from pages.clock import Clock

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*", "Access-Control-Allow-Origin" : "*"}})
app.secret_key = "super secret key"
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_NAME"] = "spotify-login-session"
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_FILE_DIR'] = './.flask_session/'

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

services = Services()
method_database = Database()
method_login = Login()
settings = Settings()
status = Status()
mail = Mail()
mail.login(settings.content["mail"]["address"], settings.content["mail"]["password"])

app.register_blueprint(
    make_github_blueprint(
        client_id = settings.content["github"]["id"],
        client_secret = settings.content["github"]["secret"]
    ),
    url_prefix = "/api/github_login"
)

caches_folder = './.spotify_caches/'
if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)

def session_cache_path():
    return caches_folder + session.get('uuid')

@app.route("/", methods = [ "GET" ])
def home():
    return (status.ready())

####################
## DATABASE
####################

def id(email, password):
    data = {
        "email" : email,
        "password" : None
    }
    message = f"{email}/{password}"
    message_bytes = message.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('ascii')
    data["password"]  = base64_message
    return (data)

@app.route("/api/database/login", methods = [ "POST" ])
def login():
    email = None
    password = None
    json_data = flask.request.json

    if ("email" in json_data and "password" in json_data):
        email = json_data["email"]
        password = json_data["password"]

        services.github.email_update(email)

    id_data = id(email, password)
    return (method_database.db_login(id_data))

@app.route("/about.json", methods = [ "GET" ])
def about():
    about_c = About()

    return (about_c.data)

@app.route("/api/reactions", methods = [ "POST" ])
def reactions():
    reactions = None
    json_data = flask.request.json

    if ("reactions" in json_data):
        services.reactions.feed(json_data)
    return (status.builder(status.SUCCESS, { "text" : f"reactions updated: {json_data}" }))

@app.route("/api/reactions", methods = [ "GET" ])
def get_reactions():
    return (status.builder(status.SUCCESS, services.reactions.data))

####################
## SERVICE SPOTIFY
####################
stats = None
clocks = []

@app.route("/api/beta/spotify/login", methods = [ "GET" ])
def spotify_beta_login():
    if not session.get('uuid'):
        # Step 1. Visitor is unknown, give random ID
        session['uuid'] = str(uuid.uuid4())

    cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope='user-follow-modify user-read-currently-playing playlist-modify-private',
        cache_handler=cache_handler,
        show_dialog=True
    )

    if request.args.get("code"):
        # Step 3. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect("/api/beta/spotify/login")

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 2. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        services.spotify.login()
        return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 4. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    try:
        me = spotify.me()
        status_data = status.SUCCESS
        if (services.reactions.get_service("spotify_status_follower") == True):
            clocks.append(Clock(spotify.me, me["followers"]["total"], ["followers", "total"], "one person started to follow you", "oh you lost a follower", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    except Exception as ex:
        me = ex
        status_data = status.ERROR

    return (status.builder(status_data, {"user" : f"{me}"}))

@app.route("/api/beta/spotify/logout", methods = [ "GET" ])
def spotify_beta_logout():
    try:
        # Remove the CACHE file (.cache-test) so that a new user can authorize.
        os.remove(session_cache_path())
        session.clear()
    except OSError as e:
        print ("Error: %s - %s." % (e.filename, e.strerror))
    return redirect("/api/beta/spotify/login")


@app.route("/api/beta/spotify/playlists", methods = [ "GET" ])
def spotify_beta_playlists():
    data = None
    cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect("/api/beta/spotify/login")
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    data = spotify.current_user_playlists()
    return data

@app.route("/api/beta/spotify/playing", methods = [ "GET" ])
def spotify_beta_currently_playing():
    cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect("/api/beta/spotify/login")
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    track = spotify.current_user_playing_track()
    if not track is None:
        return status.builder(status.SUCCESS, {"text" : track})
    return status.builder(status.SUCCESS, {"text" : "No track currently playing."})

@app.route("/api/beta/spotify/search/artist/<item>", methods = [ "GET" ])
def spotify_beta_search_artist(item):
    data = services.spotify.search(item, "artist")
    mail.send("spotify search artist", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/beta/spotify/search/playlist/<item>", methods = [ "GET" ])
def spotify_beta_search_playlist(item):
    data = services.spotify.search(item, "playlist")
    mail.send("spotify search playlist", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/beta/spotify/search/album/<item>", methods = [ "GET" ])
def spotify_beta_search_album(item):
    data = services.spotify.search(item, "album")
    mail.send("spotify search album", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/beta/spotify/search/track/<item>", methods = [ "GET" ])
def spotify_beta_search_track(item):
    data = services.spotify.search(item, "track")
    mail.send("spotify search track", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/beta/spotify/user", methods = [ "GET" ])
def spotify_beta_user():
    data = None
    cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect("/api/beta/spotify/login")
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    data = spotify.current_user()
    return data


@app.route("/api/spotify/login", methods = [ "GET" ])
def spotify_login():
    data = services.spotify.login()

    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify client logged", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/logout", methods = [ "GET" ])
def spotify_logout():
    data = services.spotify.logout()

    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify client logged out", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/callback", methods = [ "GET" ])
def spotify_callback():
    return (status.niy())

@app.route("/api/spotify/albums", methods = [ "GET" ])
def spotify_albums():
    data = services.spotify.albums()
    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify albums", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/playlists", methods = [ "GET" ])
def spotify_playlists():
    data = services.spotify.playlists()
    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify playlists", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/search/artist/<item>", methods = [ "GET" ])
def spotify_search_artist(item):
    data = services.spotify.search(item, "artist")
    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify search artist", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/search/playlist/<item>", methods = [ "GET" ])
def spotify_search_playlist(item):
    data = services.spotify.search(item, "playlist")
    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify search playlist", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/search/album/<item>", methods = [ "GET" ])
def spotify_search_album(item):
    data = services.spotify.search(item, "album")
    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify search album", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/spotify/search/track/<item>", methods = [ "GET" ])
def spotify_search_track(item):
    data = services.spotify.search(item, "track")
    if (services.reactions.get_service("spotify") == True):
        mail.send("spotify search track", method_database.get_logged()["email"], data)
    return (data)

####################
## SERVICE GITHUB
####################

@app.route("/api/github/login", methods = [ "GET" ])
def github_login():
    if (not github.authorized):
        print("NOT LOGGED")
        return redirect(url_for("github.login"))
    else:
        services.github.github = github
        sample = services.github.get_user()

        if (services.reactions.get_service("github_status_follower") == True):
            services.github.clocks.append(Clock(client = services.github.get_user, flask_app = app, default = sample["text"]["followers"], key = ["text", "followers"], greater = "You have a new follower", lower = "You lost a follower", email = method_database.get_logged()["email"], limit = None, reactions = services.reactions))
        if (services.reactions.get_service("github_status_following") == True):
            services.github.clocks.append(Clock(client = services.github.get_user, flask_app = app, default = sample["text"]["following"], key = ["text", "following"], greater = "You started to follow a new user", lower = "You unfollowed a user", email = method_database.get_logged()["email"], limit = None, reactions = services.reactions))
        if (services.reactions.get_service("github_status_repo") == True):
            services.github.clocks.append(Clock(client = services.github.get_user, flask_app = app, default = sample["text"]["public_repos"], key = ["text", "public_repos"], greater = "You have a new repository", lower = "You deleted a repository", email = method_database.get_logged()["email"], limit = None, reactions = services.reactions))
            return (status.success())
        return (status.error())

@app.route("/api/github/user", methods = [ "GET" ])
def github_user():
    data = services.github.get_user()
    return (data)

@app.route("/api/github/user/<username>", methods = [ "GET" ])
def github_search_user(username):
    data = services.github.get_user(username)
    return (data)

@app.route("/api/github/repositories", methods = [ "GET" ])
def github_repositories():
    data = services.github.get_repositories()
    return (data)

@app.route("/api/github/repositories/<owner>", methods = [ "GET" ])
def github_owner_repositories(owner):
    data = services.github.get_repositories(owner)
    if (services.reactions.get_service("github") == True):
        mail.send("github repositories", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/github/actions/<owner>/<repository>", methods = [ "GET" ])
def github_actions(owner, repository):
    data = services.github.get_actions(owner, repository)
    if (services.reactions.get_service("github") == True):
        mail.send("github repositories", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/github/branches/<owner>/<repository>", methods = [ "GET" ])
def github_branches(owner, repository):
    data = services.github.get_branches(owner, repository)
    if (services.reactions.get_service("github") == True):
        mail.send("github branches", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/github/events/<owner>/<repository>", methods = [ "GET" ])
def github_events(owner, repository):
    data = services.github.get_events(owner, repository)
    if (services.reactions.get_service("github") == True):
        mail.send("github events", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/github/callback", methods = [ "GET" ])
def github_callback():
    return (status.success())

####################
## SERVICE GOOGLE
####################

@app.route("/google/login", methods = [ "GET" ])
def google_login():
    # return (services.google.login(
    #     settings.content["google"]["id"],
    #     settings.content["google"]["secret"]
    # ))
    # id: 83804256235-scifviqvoh0n1hvm8ngh030mtsqdmda7.apps.googleusercontent.com
    # secret: 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

    return (status.niy())

@app.route("/google/callback", methods = [ "GET" ])
def google_callback():
    return (status.success())

####################
## SERVICE EPITECH
####################

@app.route("/api/epitech/login", methods = [ "POST" ])
def epitech_login():
    key = None
    before = None
    json_data = flask.request.json

    if ("key" in json_data):
        key = json_data["key"]
    if (method_database.has_key("epitech") == True):
        before = key
        key = method_database.find_data()["epitech"]
    data = services.epitech.login_user(key)
    sample = services.epitech.notifications()

    if (services.reactions.get_service("epitech_status_notification") == True):
        services.epitech.clocks.append(Clock(services.epitech.notifications, sample, [], "You have a new notification", "A notification has been removed", method_database.get_logged()["email"], limit = None, reactions = services.reactions))

    if (data["status_code"] < 100 and key != None):
        method_database.add_key({"epitech" : key}, "epitech")
    return (data)

@app.route("/api/epitech/notifications", methods = [ "GET" ])
def epitech_notifications():
    data = services.epitech.notifications()
    if (services.reactions.get_service("epitech") == True):
        mail.send("epitech notifications", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/epitech/refresh", methods = [ "POST" ])
def epitech_refresh():
    key = None
    json_data = flask.request.json

    if ("key" in json_data):
        key = json_data["key"]
    data = services.epitech.refresh(key)
    if (data["status_code"] < 100 and key != None):
        method_database.add_key({"epitech" : key}, "epitech")
    if (services.reactions.get_service("epitech") == True):
        mail.send("epitech refresh", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/epitech/user", methods = [ "GET" ])
def epitech_user():
    player = services.spotify.play()
    data = services.epitech.user_data()
    if (services.reactions.get_service("epitech") == True):
        mail.send("epitech user", method_database.get_logged()["email"], data)
    return ({ "epitech" : data, "player" : player })

####################
## SERVICE WEATHER
####################

@app.route("/api/weather/login", methods = [ "POST" ])
def weather_key():
    key = None
    json_data = flask.request.json

    if ("key" in json_data):
        key = json_data["key"]
    if (method_database.has_key("weather") == True):
        key = method_database.find_data()["weather"]
    data = services.weather.login(key)
    if (data["status_code"] < 100 and key != None):
        method_database.add_key({"weather" : key}, "weather")
    sample = services.weather.request()["text"]["current"]["temperature"]
    if (services.reactions.get_service("weather_status_limit") != None and services.reactions.get_service("weather_status_temperature") == True):
        services.weather.clocks.append(Clock(services.weather.request, sample, ["text", "current", "temperature"], "Weather is hot today", "Weather is cold today", method_database.get_logged()["email"], services.reactions.get_service("weather_status_limit"), reactions = services.reactions))

    return (data)

@app.route("/api/weather/refresh", methods = [ "POST" ])
def weather_refresh():
    key = None
    json_data = flask.request.json

    if ("key" in json_data):
        key = json_data["key"]
    data = services.weather.refresh(key)
    if (services.reactions.get_service("weather") == True):
        mail.send("weather refresh", method_database.get_logged()["email"], data)
    if (data["status_code"] < 100 and key != None):
        method_database.add_key({"weather" : key}, "weather")
    return (data)

@app.route("/api/weather/unit/<unit>", methods = [ "GET" ])
def weather_unit(unit):
    data = services.weather.unit(unit)
    if (services.reactions.get_service("weather") == True):
        mail.send("weather unit", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/weather/city/<city>", methods = [ "GET" ])
def weather_city(city):
    data = services.weather.city(city)
    if (services.reactions.get_service("weather") == True):
        mail.send("weather city", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/weather", methods = [ "GET" ])
def weather_get():
    data = None

    if (services.weather.key == None):
        services.weather.login(settings.content["weather"]["key"])
    data = services.weather.request()
    return (data)

@app.route("/api/weather/logout", methods = [ "GET" ])
def weather_logout():
    data = None

    data = services.weather.logout()
    if (services.reactions.get_service("weather") == True):
        mail.send("weather city", method_database.get_logged()["email"], data)
    return (data)

####################
## SERVICE EMAIL
####################

@app.route("/api/mail", methods = [ "POST" ])
def email_send():
    subject = None
    email = None
    message = None
    json_data = flask.request.json

    if ("subject" in json_data and "email" in json_data and "message" in json_data):
        subject = json_data["subject"]
        email = json_data["email"]
        message = json_data["message"]

    data = mail.send(subject, email, message)
    return (data)

####################
## SERVICE COFFEE
####################

@app.route("/api/coffee", methods = [ "GET" ])
def coffee():
    if (services.coffee.key == None):
        return (services.coffee.login(settings.content["coffee"]["key"]))
    return (services.coffee.login(services.coffee.key))

@app.route("/api/coffee/login", methods = [ "POST" ])
def coffee_login():
    key = None
    json_data = flask.request.json

    if ("key" in json_data):
        key = json_data["key"]
    if (method_database.has_key("coffee") == True):
        key = method_database.find_data()["coffee"]
    data = services.coffee.login(key)
    if (data["status_code"] < 100):
        method_database.add_key({"coffee" : key}, "coffee")
    subscriptions = services.coffee.subscriptions()
    extras = services.coffee.extras()
    supporters = services.coffee.supporters()

    if (services.reactions.get_service("coffee_status_follower") == True):
        services.coffee.clocks.append(Clock(services.coffee.subscriptions, subscriptions, [], "You have a new subscriber", "You lost a subscriber", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    if (services.reactions.get_service("coffee_status_extras") == True):
        services.coffee.clocks.append(Clock(services.coffee.extras, extras, [], "You received a new extra", "You lost an extra", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    if (services.reactions.get_service("coffee_status_supporter") == True):
        services.coffee.clocks.append(Clock(services.coffee.supporters, supporters, [], "You have a new supporter", "You lost a supporter", method_database.get_logged()["email"], limit = None, reactions = services.reactions))

    if (services.reactions.get_service("coffee") == True):
        mail.send("coffee login", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/coffee/logout", methods = [ "GET" ])
def coffee_logout():
    data = services.coffee.logout()
    if (services.reactions.get_service("coffee") == True):
        mail.send("coffee logout", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/coffee/refresh", methods = [ "POST" ])
def coffee_refresh():
    key = None
    json_data = flask.request.json

    if ("key" in json_data):
        key = json_data["key"]
    data = services.coffee.refresh(key)
    if (services.reactions.get_service("coffee") == True):
        mail.send("coffee refresh", method_database.get_logged()["email"], data)
    if (data["status_code"] < 100):
        method_database.add_key({"coffee" : key}, "coffee")
    return (data)

@app.route("/api/coffee/subscriptions", methods = [ "GET" ])
def coffee_subscriptions():
    data = services.coffee.subscriptions()
    if (services.reactions.get_service("coffee") == True):
        mail.send("coffee subscriptions", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/coffee/supporters", methods = [ "GET" ])
def coffee_supporters():
    data = services.coffee.supporters()
    if (services.reactions.get_service("coffee") == True):
        mail.send("coffee supporters", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/coffee/extras", methods = [ "GET" ])
def coffee_extras():
    data = services.coffee.extras()
    if (services.reactions.get_service("coffee") == True):
        mail.send("coffee extras", method_database.get_logged()["email"], data)
    return (data)

####################
## SERVICE CRYPTO
####################

@app.route("/api/crypto", methods = [ "GET" ])
def crypto_all():
    if (services.crypto.currencies == None):
        services.crypto.load(settings.content["crypto"]["currencies"])
    data = services.crypto.crypto()
    usd = services.crypto.crypto_usd()["bpi"]["USD"]["rate_float"]
    eur = services.crypto.crypto_eur()["bpi"]["EUR"]["rate_float"]
    chf = services.crypto.crypto_chf()["bpi"]["CHF"]["rate_float"]
    cad = services.crypto.crypto_cad()["bpi"]["CAD"]["rate_float"]
    gbp = services.crypto.crypto_gbp()["bpi"]["GBP"]["rate_float"]

    if (services.reactions.get_service("crypto_status_usd") == True):
        services.crypto.clocks.append(Clock(services.crypto.crypto_usd, usd, ["bpi", "USD", "rate_float"], "USD has increased", "USD has decreased", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    if (services.reactions.get_service("crypto_status_eur") == True):
        services.crypto.clocks.append(Clock(services.crypto.crypto_eur, eur, ["bpi", "EUR", "rate_float"], "EUR has increased", "EUR has decreased", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    if (services.reactions.get_service("crypto_status_chf") == True):
        services.crypto.clocks.append(Clock(services.crypto.crypto_chf, chf, ["bpi", "CHF", "rate_float"], "CHF has increased", "CHF has decreased", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    if (services.reactions.get_service("crypto_status_cad") == True):
        services.crypto.clocks.append(Clock(services.crypto.crypto_cad, cad, ["bpi", "CAD", "rate_float"], "CAD has increased", "CAD has decreased", method_database.get_logged()["email"], limit = None, reactions = services.reactions))
    if (services.reactions.get_service("crypto_status_gbp") == True):
        services.crypto.clocks.append(Clock(services.crypto.crypto_gbp, gbp, ["bpi", "GBP", "rate_float"], "GBP has increased", "GBP has decreased", method_database.get_logged()["email"], limit = None, reactions = services.reactions))

    return (data)

@app.route("/api/crypto/<name>", methods = [ "GET" ])
def crypto_name(name):
    if (services.crypto.currencies == None):
        services.crypto.load(settings.content["crypto"]["currencies"])
    data = services.crypto.crypto(name)
    if (services.reactions.get_service("crypto") == True):
        mail.send("crypto crypto", method_database.get_logged()["email"], data)
    return (data)

@app.route("/api/crypto/historic/<begin>/<end>", methods = [ "GET" ])
def crypto_historic(begin, end):
    data = services.crypto.historical(begin, end)
    if (services.reactions.get_service("crypto") == True):
        mail.send("crypto historic", method_database.get_logged()["email"], data)
    return (data)

####################
## SERVICE 404
####################

@app.errorhandler(404)
def not_found(e):
    #return (render_template("404.html"))
    return (status.builder(status.ERROR, f"Error 404 handled: {flask.request.url}"))

@app.errorhandler(500)
def not_found(e):
    #return (render_template("404.html"))
    return (status.builder(status.ERROR, "Error 500 handled"))

def banner():
    if (os.path.isfile("resources/banner") == True):
        with open("resources/banner", 'r') as f:
            print(f.read())

@app.route("/api/routes", methods = [ "GET" ])
def routes_info():
    routes = []
    for rule in app.url_map.iter_rules():
        try:
            if rule.endpoint != 'static':
                if hasattr(app.view_functions[rule.endpoint], 'import_name'):
                    import_name = app.view_functions[rule.endpoint].import_name
                    obj = import_string(import_name)
                    routes.append({rule.rule: "%s\n%s" % (",".join(list(rule.methods)), obj.__doc__)})
                else:
                    routes.append({rule.rule: app.view_functions[rule.endpoint].__doc__})
        except Exception as exc:
            routes.append({rule.rule: 
                           "(%s) INVALID ROUTE DEFINITION!!!" % rule.endpoint})
            route_info = "%s => %s" % (rule.rule, rule.endpoint)
            app.logger.error("Invalid route: %s" % route_info, exc_info=True)
            # func_list[rule.rule] = obj.__doc__

    return status.builder(status.SUCCESS, {"routes" : routes})

if (__name__ == "__main__"):
    banner()
    mod = False
    if (len(sys.argv) == 2):
        if (sys.argv[1] == "debug"):
            mod = True
    app.run(threaded = True, host = "0.0.0.0", port = 8080, debug = mod)

