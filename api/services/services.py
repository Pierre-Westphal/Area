from services.spotify import Spotify
from services.github import Github
from services.google import Google
from services.coffee import Coffee
from services.weather import Weather
from services.crypto import Crypto
from services.epitech import Epitech
from services.reactions import Reactions

class Services:
    def __init__(self):
        self.spotify = Spotify()
        self.github = Github()
        self.google = Google()
        self.weather = Weather()
        self.coffee = Coffee()
        self.crypto = Crypto()
        self.epitech = Epitech()
        self.reactions = Reactions()

