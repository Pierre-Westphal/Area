import json

from pages.status import Status
from pages.clock import Clock

class Github:
    def __init__(self):
        self.github = None
        self.status = Status()
        self.stats = None
        self.clocks = []
        self.email = None

    def email_update(self, email):
        self.email = email

    def check(self):
        if (self.github == None):
            print("[?] login required")
            return (False)
        return (True)

    def follow(self):
        pass

    def get_user(self, app = None, username = None):
        print("APP: ", app)
        if (app != None):
            with app.test_request_context():
                try:
                    if (self.check() == True):
                        if (username == None):
                            return (self.jsonnify(
                                self.github.get(
                                    '/user'
                                )
                            ))
                        return (self.github.get(
                            f"/users/{username}"
                        ))
                except Exception as e:
                    print(e)
        else:
            try:
                if (self.check() == True):
                    if (username == None):
                        return (self.jsonnify(
                            self.github.get(
                                '/user'
                            )
                        ))
                    return (self.github.get(
                        f"/users/{username}"
                    ))
            except Exception as e:
                print(e)

    def get_repositories(self, owner = None):
        if (self.check() == True):
            if (owner == None):
                return (self.jsonnify(
                    self.github.get(
                        "/user/repos"
                    )
                ))
            return (self.jsonnify(
                self.github.get(
                    f"/orgs/{owner}/repos"
                )
            ))

    def get_actions(self, owner, repository):
        if (self.check() == True):
            return (self.jsonnify(
                self.github.get(
                    f"/repos/{owner}/{repository}/actions/artifacts"
                )
            ))

    def get_branches(self, owner, repository):
        if (self.check() == True):
            return (self.jsonnify(
                self.github.get(
                    f"/repos/{owner}/{repository}/branches"
                )
            ))

    def get_events(self, owner, repository):
        if (self.check() == True):
            return (self.jsonnify(
                self.github.get(
                    f"/networks/{owner}/{repository}/events"
                )
            ))
 
    def jsonnify(self, data):
        if (data.ok):
            return (self.status.builder(self.status.SUCCESS, data.json()))
        return (self.status.builder(self.status.ERROR, data.json()))
