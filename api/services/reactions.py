import json

class Reactions:
    def __init__(self):
        self.data = {
            "reactions" : [
                {
                    "name" : "spotify_status_follower",
                    "status" : True
                },
                {
                    "name" : "github_status_follower",
                    "status" : True
                },
                {
                    "name" : "github_status_following",
                    "status" : True
                },
                {
                    "name" : "github_status_repo",
                    "status" : True
                },
                {
                    "name" : "epitech_status_notification",
                    "status" : True
                },
                {
                    "name" : "weather_status_temperature",
                    "status" : True
                },
                {
                    "name" : "weather_status_limit",
                    "status" : 10
                },
                {
                    "name" : "coffee_status_follower",
                    "status" : True
                },
                {
                    "name" : "coffee_status_extras",
                    "status" : True
                },
                {
                    "name" : "coffee_status_supporter",
                    "status" : True
                },
                {
                    "name" : "crypto_status_usd",
                    "status" : True
                },
                {
                    "name" : "crypto_status_eur",
                    "status" : True
                },
                {
                    "name" : "crypto_status_chf",
                    "status" : True
                },
                {
                    "name" : "crypto_status_cad",
                    "status" : True
                },
                {
                    "name" : "crypto_status_gbp",
                    "status" : True
                },
                {
                    "name" : "mod",
                    "status" : "mail"
                },
                {
                    "name" : "webhook",
                    "status" : " "
                }
            ]
        }

    def feed(self, data):
        self.data = data

    def get_service(self, service):
        if (self.data != None):
            for i in range(0, len(self.data["reactions"])):
                if (self.data["reactions"][i]["name"] == service):
                    return (self.data["reactions"][i]["status"])
