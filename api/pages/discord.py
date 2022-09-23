from discord_webhook import DiscordWebhook

class Discord:
    def __init__(self):
        pass

    def send(self, url, message):
        webhook = DiscordWebhook(
            url = url,
            content = message
        )
        response = webhook.execute()

