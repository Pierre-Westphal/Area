import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotipy.oauth2 import SpotifyClientCredentials

from pages.status import Status
from pages.clock import Clock

class Spotify:
    def __init__(self):
        self.spotify = None
        self.status = Status()
        self.stats = None
        self.clocks = []

    def login(self):
        client_credentials_manager = SpotifyClientCredentials()
        self.spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

        #self.spotify = spotipy.Spotify(
        #    auth_manager = SpotifyOAuth(
        #        client_id = client_id,
        #        client_secret = client_secret,
        #        redirect_uri = redirect_uri,
        #        scope = "user-library-read"
        #    )
        #)

        return (self.status.builder(self.status.SUCCESS, { "text" : f"{self.spotify}" }))

    def logout(self):
        self.spotify = None

        return (self.status.builder(self.status.SUCCESS, { "spotify" : self.spotify }))

    def albums(self):
        return (self.status.builder(self.status.SUCCESS, self.spotify.current_user_saved_albums()))

    def playlists(self):
        return (self.status.builder(self.status.SUCCESS, self.spotify.current_user_playlists()))

    def recent(self):
        return (self.status.builder(self.status.SUCCESS, self.spotify.current_user_recently_played()))

    def follow(self):
        return (self.status.builder(self.status.SUCCESS, self.spotify.current_user_follow_playlist()))

    def play(self):
        if (self.spotify != None):
            try:
                self.spotify.start_playback(uris=['spotify:track:6gdLoMygLsgktydTQ71b15'])
                self.spotify.volume(50)
                return (self.status.builder(self.status.SUCCESS, { "text" : "playing song" }))
            except Exception as ex:
                return (self.status.builder(self.status.ERROR, { "text" : "spotify user logged must be premium" }))
        return (self.status.builder(self.status.ERROR, { "text" : "user not logged" }))

    def search(self, data, type_value):
        return (self.status.builder(self.status.SUCCESS, self.spotify.search(q=f"{type_value}:{data}", type = type_value)))
