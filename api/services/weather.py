import json
import requests

from pages.status import Status
from pages.clock import Clock

class Weather:
    def __init__(self):
        self.host = "http://api.weatherstack.com"
        self.key = None
        self.city_value = "Lyon"
        self.unit_value = "m"
        self.clocks = []

        self.status = Status()

    def login(self, key):
        self.key = key
        return (self.status.builder(self.status.SUCCESS, { "key" : self.key }))

    def refresh(self, key):
        self.key = key
        return (self.status.builder(self.status.SUCCESS, { "key" : self.key }))

    def logout(self):
        self.key = None
        return (self.status.builder(self.status.SUCCESS, { "key" : self.key }))

    def city(self, city_data):
        self.city_value = city_data
        return (self.status.builder(self.status.SUCCESS, { "city" : self.city_value }))

    def unit(self, unit_data):
        self.unit_value = unit_data
        return (self.status.builder(self.status.SUCCESS, { "unit" : self.unit_value }))

    def request(self):
        value = None
        host = "{}/forecast?access_key={}&query={}&unit={}".format(
            self.host,
            self.key,
            self.city_value,
            self.unit_value
        )
        r = requests.get(host)

        if (r.status_code == 200):
            value = self.status.SUCCESS
        else:
            value = self.status.ERROR
        return (self.status.builder(value, json.loads(r.text)))