import json
import requests

from pages.status import Status
from pages.clock import Clock

class Crypto:
    def __init__(self):
        self.host = "https://api.coindesk.com/v1/bpi"
        self.currencies = None
        self.status = Status()
        self.clocks = []

    def load(self, currencies):
        self.currencies = currencies
        return (self.status.builder(self.status.SUCCESS, { "currencies" : self.currencies }))

    def crypto(self, currencie = None):
        value = "BTC"
        returned = None

        if (currencie != None):
            for data in self.currencies:
                if (data["currency"] == currencie or data["country"] == currencie):
                    value = data["currency"]
        r = requests.get("{}/currentprice/{}.json".format(self.host, value))
        if (r.status_code == 200):
            returned = self.status.SUCCESS
        else:
            returned = self.status.ERROR
        return (self.status.builder(returned, { "result" : json.loads(r.text)}))

    def crypto_usd(self):
        currencie = "USD"
    
        for data in self.currencies:
            if (data["currency"] == currencie or data["country"] == currencie):
                value = data["currency"]
        r = requests.get("{}/currentprice/{}.json".format(self.host, value))
        
        return (json.loads(r.text))

    def crypto_eur(self):
        currencie = "EUR"
    
        for data in self.currencies:
            if (data["currency"] == currencie or data["country"] == currencie):
                value = data["currency"]
        r = requests.get("{}/currentprice/{}.json".format(self.host, value))
        
        return (json.loads(r.text))

    def crypto_chf(self):
        currencie = "CHF"
    
        for data in self.currencies:
            if (data["currency"] == currencie or data["country"] == currencie):
                value = data["currency"]
        r = requests.get("{}/currentprice/{}.json".format(self.host, value))
        
        return (json.loads(r.text))
    
    def crypto_cad(self):
        currencie = "CAD"
    
        for data in self.currencies:
            if (data["currency"] == currencie or data["country"] == currencie):
                value = data["currency"]
        r = requests.get("{}/currentprice/{}.json".format(self.host, value))
        
        return (json.loads(r.text))

    def crypto_gbp(self):
        currencie = "GBP"
    
        for data in self.currencies:
            if (data["currency"] == currencie or data["country"] == currencie):
                value = data["currency"]
        r = requests.get("{}/currentprice/{}.json".format(self.host, value))
        
        return (json.loads(r.text))

    def historical(self, begin, end):
        returned = None

        r = requests.get("{}/historical/close.json?start={}&end={}".format(self.host, begin, end))

        if (r.status_code == 200):
            returned = self.status.SUCCESS
        else:
            returned = self.status.ERROR
        return (self.status.builder(returned, { "result" : json.loads(r.text)}))

