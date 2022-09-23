import os
import json
import requests

class Api:
    def __init__(self):
        self.routes = []
        self.path = "tests"
        self.root = "http://127.0.0.1:8080"

        self.load()
        self.resume()
        self.run()

    def resume(self):
        print(f"Loaded {len(self.routes)} routes\n")

    def load(self):
        files = os.listdir(self.path)

        for file in files:
            with open("{}/{}".format(self.path, file), 'r') as f:
                self.routes.append(json.load(f))

    def run(self):
        result = None

        for route in self.routes:
            print(":: route: {}".format(route["name"]))
            if (route["method"] == "get"):
                r = requests.get("{}{}".format(self.root, route["route"]))
            else:
                r = requests.post("{}{}".format(self.root, route["route"]))

            if (r.status_code == 200):
                result = json.loads(r.text)
                if (result["status_code"] == route["status_code"]):
                    print("    -- status_code valid")
                else:
                    print("    xx status_code invalid: got: {} expected: {}".format(
                        result["status_code"],
                        route["status_code"]
                    ))

                if (result["text"] == route["text"]):
                    print("    -- text valid")
                else:
                    print("    xx text invalid: got: {} expected: {}".format(
                        result["text"],
                        route["text"]
                    ))
            else:
                print("    ==> login required")

if (__name__ == "__main__"):
    Api()