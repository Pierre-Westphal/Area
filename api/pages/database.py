import os
import hashlib
import flask
import json

from flask import Flask
from flask_mongoengine import MongoEngine
from pymongo import MongoClient
from flask_pymongo import PyMongo
from pymongo import MongoClient

from pages.status import Status

class Database:
    def __init__(self):
        self.client = MongoClient("mongodb://mongodb:27017")
        self.database = self.client["database"]
        self.status = Status()
        self.logged = None

    # fonction au login, data contient le mail et le hash
    def db_login(self, data):
        user = None
        user = self.database.users.find_one({"email": data["email"]})
        if (user == None):
            self.database.users.insert_one({
                "email": data["email"],
                'password': data['password'],
                'coffee': None,
                'epitech': None,
                'weather': None})
            self.logged = data["email"]
            return (self.status.builder(self.status.REGISTERED, "User created"))
        elif user['password'] != data['password']:
            return (self.status.builder(self.status.INCORRECT_PASSWORD, "Wrong password for this user"))
        else:
            self.logged = data["email"]
            return (self.status.builder(self.status.CORRECT_PASSWORD, "User logged"))
        # self.database.users.insert_one(data)
        # return (flask.jsonify(message = "success"))

    # fonction pour récupérer les keys, mail contient le mail, renvoie une biblio avec les trois clés
    def find_data(self):
        user = self.database.users.find_one({"email": self.logged})
        keys = {
            'coffee': None,
            'epitech': None,
            'weather': None
        }

        print(f"[+] KEYS: {keys}")

        if (user != None):
            keys["coffee"] = user["coffee"]
            keys['epitech'] = user['epitech']
            keys['weather'] = user['weather']

        return (keys)

    # fonction à la première connection à un service (nouvelle clé), data contient le mail, le nom du service et la key
    def add_key(self, data, service):
        user = self.database.users.find_one({"email": self.logged})
        if (user == None):
            return (self.status.builder(self.status.ERROR, "User not found"))
        user = self.database.users.update_one({"email": self.logged}, {"$set" : {service: data[service]}})
        return (self.status.builder(self.status.SUCCESS, f"Key updated {service} => {data[service]}"))

    def get_logged(self):
        if (self.logged != None):
            return ({ "email" : self.logged })
        return ({ "email" : "area.epitech.sender@gmail.com" })

    def has_key(self, service):
        user = None

        if (self.logged != None):
            user = self.database.users.find_one({"email" : self.logged})
            if (user != None):
                if (user[service] != None):
                    return (True)
        return (False)

    def find_one(self, id):
        print(f"DATABASE: {self.database}")
        return (self.database.users.find_one({"_id": id}))
