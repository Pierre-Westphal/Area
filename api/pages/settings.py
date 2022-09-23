import os
import json

class Settings:
    def __init__(self):
        self.path = "resources/settings.json"
        self.content = None

        self.load()

    def load(self):
        if (os.path.isfile(self.path) == True):
            print("[+] path found")
            print("[-] loading content")
            with open(self.path, 'r') as f:
                self.content = json.load(f)
            print("[+] content loaded")
        else:
            print("[x] path not found")
