class Status:
    def __init__(self):
        self.aligner = 100

        ## SUCCESS
        self.READY = 1
        self.SUCCESS = 2
        self.LOGGED = 3
        self.REGISTERED = 4
        self.AUTHORIZED = 5
        self.CORRECT_PASSWORD = 6

        ## ERRORS
        self.NOT_READY = self.READY * self.aligner
        self.ERROR = self.SUCCESS * self.aligner
        self.NOT_LOGGED = self.LOGGED * self.aligner
        self.NOT_REGISTERED = self.REGISTERED * self.aligner
        self.BANNED = self.AUTHORIZED * self.aligner
        self.INCORRECT_PASSWORD = self.CORRECT_PASSWORD * self.aligner

        self.NOT_IMPLEMENTED = 666

    def banned(self):
        return (self.builder(self.BANNED, "banned"))

    def ready(self):
        return (self.builder(self.READY, "ready"))

    def success(self):
        return (self.builder(self.SUCCESS, "success"))

    def logged(self):
        return (self.builder(self.LOGGED, "logged"))

    def registered(self):
        return (self.builder(self.REGISTERED, "registered"))

    def not_ready(self):
        return (self.builder(self.NOT_READY, "not ready"))

    def error(self):
        return (self.builder(self.ERROR, "error"))

    def not_logged(self):
        return (self.builder(self.NOT_LOGGED, "not logged"))

    def not_registered(self):
        return (self.builder(self.NOT_REGISTERED, "not registered"))

    def niy(self):
        return (self.builder(self.NOT_IMPLEMENTED, "not implemented yet"))

    def builder(self, code, text):
        return ({
            "status_code" : code,
            "text" : text
        })
