import json
import time
import requests
import threading
from flaskthreads import AppContextThread

from pages.mail import Mail
from pages.discord import Discord
from pages.settings import Settings

class Clock:
    def __init__(self, client = None, flask_app = None, default = None, key = None, greater = None, lower = None, email = None, limit = None, reactions = None):
        print("-------------------------------------")
        print(f"creating new clock: {client}")
        print(f"default: {default}")
        print(f"key: {key}")
        print(f"flask: {flask_app}")
        print(f"reactions: {reactions.get_service('webhook')}")
        print(f"greater: {greater}")
        print(f"lower: {lower}")
        print(f"email: {email}")
        print(f"test: {client()}")
        print("-------------------------------------")
        self.client = client
        self.default = default
        self.threads = []
        self.keys = key
        self.app = flask_app
        self.limit = limit
        self.settings = Settings()
        self.email = email
        self.mail = Mail()
        self.mail.login(self.settings.content["mail"]["address"], self.settings.content["mail"]["password"])
        self.discord = Discord()
        self.message_greater = greater
        self.message_lower = lower
        self.reactions = reactions

        self.wait()

    def finder(self, content):
        if (content != None):
            for key in self.keys:
                content = content[key]
        return (content)

    def request(self):
        launched = True
        while (launched == True):
            if (self.app != None):
                r = self.client(app = self.app, username = None)
            else:
                r = self.client()
            data = self.finder(r)

            print(f"client: {self.client} result: {r} parsed: {data}")
            if (data != None and data != self.default):
                if (self.limit == None):
                    if (type(data) == dict):
                        data = len(data)
                        if (type(self.default) != int):
                            self.default = len(self.default)
                    if (data > self.default):
                        if (self.reactions.get_service("mod") == "mail"):
                            print(f"sending upper to {self.email}")
                            self.mail.send(self.message_greater, self.email, self.message_greater)
                        else:
                            self.discord.send(self.reactions.get_service("webhook"), self.message_greater)
                    elif (data < self.default):
                        if (self.reactions.get_service("mod") == "mail"):
                            print(f"sending lower to {self.email}")
                            self.mail.send(self.message_lower, self.email, self.message_lower)
                        else:
                            print(f"sending lower by webhook: default: {self.default}, data: {data}")
                            self.discord.send(self.reactions.get_service("webhook"), self.message_lower)
                else:
                    if (type(data) == dict):
                        data = len(data)
                        self.default = len(self.default)
                    if (data > self.default):
                        if (self.reactions.get_service("mod") == "mail"):
                            print(f"sending upper to {self.email}")
                            self.mail.send(self.message_greater, self.email, self.message_greater)
                        else:
                            self.discord.send(self.reactions.get_service("webhook"), self.message_greater)
                    elif (data < self.default):
                        if (self.reactions.get_service("mod") == "mail"):
                            print(f"sending lower to {self.email}")
                            self.mail.send(self.message_lower, self.email, self.message_lower)
                        else:
                            print(f"sending lower by webhook: default: {self.default}, data: {data}")
                            self.discord.send(self.reactions.get_service("webhook"), self.message_lower)
                print(f"\nDefault: {self.default}\nData: {data}\n")
            else:
                print("data is empty")
            time.sleep(60)

    def wait(self):
        t = AppContextThread(target = self.request)
        t.start()

