import os
import json
import requests
from epytech import session, user, login, notif

from pages.status import Status
from pages.clock import Clock

class Epitech:
    def __init__(self):
        self.user = user.init()
        self.login = login.init()
        self.notif = notif.init()
        self.key = None
        self.key_data = None
        self.clocks = []

        self.status = Status()

    def login_user(self, key):
        self.key_data = key
        self.key = session.create(f"https://intra.epitech.eu/auth-{self.key_data}")
        data = self.load()

        return (data)

    def load(self):
        try:
            if (self.key_data != None and self.key != None and (self.key != None or self.key_data != None)):
                if (len(self.key_data) == 40):
                    self.user.load(self.key)
                    self.login.load(self.key)
                    self.notif.load(self.key)

                    return (self.status.builder(self.status.SUCCESS, f"loaded with key: {self.key_data}"))
            return (self.status.builder(self.status.BANNED, { "text" : f"invalid key", "key" : f"{self.key_data}" }))
        except Exception as ex:
            return (self.status.builder(self.status.BANNED, { "text" : f"invalid key: {ex}", "key" : f"{self.key_data}" } ))

    def user_data(self):
        informations = ["login", "title", "internal_email", "lastname", "firstname", "userinfo", "referent_used", "picture", "picture_fun", "scolaryear", "promo", "semester", "location", "documents", "userdocs", "shell", "close", "ctime", "mtime", "id_promo", "id_history", "course_code", "semester_code", "school_id", "school_code", "school_title", "old_id_promo", "old_id_location", "rights", "invited", "studentyear", "admin", "editable", "restrictprofiles"
        ]
        data = {}

        for i in informations:
            data[i] = self.user.search(i)

        return (self.status.builder(self.status.SUCCESS, data))

    def refresh(self, key):
        self.key_data = key
        self.key = session.create(f"https://intra.epitech.eu/auth-{self.key_data}")

        return (self.status.builder(self.status.SUCCESS, f"key updated: {self.key_data}"))

    def notifications(self):
        notifications_data = []

        if (self.notif.data != None):
            if (self.notif.len() > 0):
                for notification in range(0, self.notif.len()):
                    notifications_data.append(self.notif.search(notification))

        return (self.status.builder(self.status.SUCCESS, notifications_data))
