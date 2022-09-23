import spotipy
from spotipy.oauth2 import SpotifyOAuth
from time import sleep
import os


os.environ["SPOTIPY_CLIENT_ID"] = "b2aab053fc67420abcde533046c2da7e"
os.environ["SPOTIPY_CLIENT_SECRET"] = "3369eaad77154324befde25c26f0f401"
os.environ["SPOTIPY_REDIRECT_URI"]="http://localhost/api/spotify/callback"
scope = "user-read-playback-state,user-modify-playback-state"
sp = spotipy.Spotify(client_credentials_manager=SpotifyOAuth(scope=scope))

# Change track
sp.start_playback(uris=['spotify:track:6gdLoMygLsgktydTQ71b15'])

# Change volume
sp.volume(100)
sleep(2)
sp.volume(50)
sleep(2)
sp.volume(100)

