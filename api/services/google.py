import google.oauth2.credentials

class Google:
    def __init__(self):
        self.credentials = None

    def login(self, client_id, client_secret):
        self.credentials = google.oauth2.credentials.Credentials(
            'access_token',
            client_id = client_id,
            client_secret = client_secret
        )
