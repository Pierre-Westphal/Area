import json
import requests

from pages.status import Status
from pages.clock import Clock

class Coffee:
    def __init__(self):
        self.host = "https://developers.buymeacoffee.com/api/v1"
        self.key = None
        self.clocks = []
        self.headers = {
            "Authorization" : "Bearer "
        }

        self.status = Status()

    def login(self, key):
        self.key = key
        self.headers["Authorization"] = "Bearer {}".format(self.key)
        return (self.status.builder(self.status.SUCCESS, { "key" : self.key, "headers" : self.headers }))

    def logout(self):
        self.key = None
        self.headers["Authorization"] = "Bearer {}".format(self.key)
        return (self.status.builder(self.status.SUCCESS, { "key" : self.key, "headers" : self.headers }))

    def refresh(self, key):
        self.key = key
        self.headers["Authorization"] = "Bearer {}".format(self.key)
        return (self.status.builder(self.status.SUCCESS, { "key" : self.key, "headers" : self.headers }))

    def subscriptions(self):
        value = None
        r = requests.get("{}/subscriptions".format(self.host), headers = self.headers)

        if (r.status_code == 200):
            value = self.status.SUCCESS
        else:
            value = self.status.ERROR
        try:
            return (self.status.builder(value, json.loads(r.text)))
        except:
            return (self.status.builder(self.status.BANNED, "buymeacoffee.com blocked us"))

    def supporters(self):
        value = None
        r = requests.get("{}/supporters".format(self.host), headers = self.headers)

        if (r.status_code == 200):
            value = self.status.SUCCESS
        else:
            value = self.status.ERROR
        try:
            return (self.status.builder(value, json.loads(r.text)))
        except:
            return (self.status.builder(self.status.BANNED, "buymeacoffee.com blocked us"))

    def extras(self):
        value = None
        r = requests.get("{}/extras".format(self.host), headers = self.headers)

        if (r.status_code == 200):
            value = self.status.SUCCESS
        else:
            value = self.status.ERROR
        try:
            return (self.status.builder(value, json.loads(r.text)))
        except:
            return (self.status.builder(self.status.BANNED, "buymeacoffee.com blocked us"))
