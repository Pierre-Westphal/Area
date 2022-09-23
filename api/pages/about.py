import time
import socket

class About:
    def __init__(self):
        self.data = {}

        self.load()

    def load(self):
        self.data = {
            "client" : {
                "host" : socket.gethostbyname(socket.gethostname())
            },
            "server" : {
                "current_time" : int(time.time()),
                "services" : [
                    {
                        "name" : "spotify",
                        "actions" : [
                            {
                                "name" : "login",
                                "description" : "login user"
                            },
                            {
                                "name" : "logout",
                                "description" : "logout user"
                            },
                            {
                                "name" : "user",
                                "description" : "get informations about current logged user"
                            },
                            {
                                "name" : "search artist",
                                "description" : "search artist on spotify"
                            },
                            {
                                "name" : "search album",
                                "description" : "search album on spotify"
                            },
                            {
                                "name" : "search track",
                                "description" : "search track on spotify"
                            },
                            {
                                "name" : "search playlist",
                                "description" : "search playlist on spotify"
                            },
                            {
                                "name" : "playlists",
                                "description" : "get saved playlists"
                            },
                            {
                                "name" : "albums",
                                "description" : "get saved albums"
                            },
                            {
                                "name" : "playing",
                                "description" : "get track currently played"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "user",
                                "description" : "send user informations via mail"
                            },
                            {
                                "name" : "album",
                                "description" : "send albums informations via mail"
                            },
                            {
                                "name" : "playlist",
                                "description" : "send playlists informations via mail"
                            },
                            {
                                "name" : "artist",
                                "description" : "send artist informations via mail"
                            },
                            {
                                "name" : "track",
                                "description" : "send tracks informations via mail"
                            },
                            {
                                "name" : "albums",
                                "description" : "send saved albums informations via mail"
                            },
                            {
                                "name" : "playlists",
                                "description" : "send saved playlists informations via mail"
                            },
                            {
                                "name" : "artists",
                                "description" : "send saved artists informations via mail"
                            }
                        ]
                    },
                    {
                        "name" : "github",
                        "actions" : [
                            {
                                "name" : "get user",
                                "description" : "get informations about current logged user"
                            },
                            {
                                "name" : "get repositories",
                                "description" : "get all repositories from someone"
                            },
                            {
                                "name" : "get actions",
                                "description" : "get all actions from someone's repository"
                            },
                            {
                                "name" : "get branches",
                                "description" : "get all branches from someone's repository"
                            },
                            {
                                "name" : "get events",
                                "description" : "get all events from someone's repository"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "user",
                                "description" : "send current user informations via mail"
                            },
                            {
                                "name" : "search user",
                                "description" : "send searched user informations via mail"
                            },
                            {
                                "name" : "repositories",
                                "description" : "send repositories list informations via mail"
                            },
                            {
                                "name" : "actions",
                                "description" : "send actions informations via mail"
                            },
                            {
                                "name" : "branches",
                                "description" : "send branches informations via mail"
                            },
                            {
                                "name" : "events",
                                "description" : "send events informations via mail"
                            },
                            {
                                "name" : "follow Neo",
                                "description" : "follow Neo when you search for github user informations"
                            }
                        ]
                    },
                    {
                        "name" : "coffee",
                        "actions" : [
                            {
                                "name" : "login",
                                "description" : "login a key"
                            },
                            {
                                "name" : "logout",
                                "description" : "logout current key"
                            },
                            {
                                "name" : "refresh",
                                "description" : "refresh current key"
                            },
                            {
                                "name" : "subscriptions",
                                "description" : "get current subscriptions"
                            },
                            {
                                "name" : "supporters",
                                "description" : "get current supporters"
                            },
                            {
                                "name" : "extras",
                                "description" : "get current extras"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "login",
                                "description" : "send new key registered via mail"
                            },
                            {
                                "name" : "logout",
                                "description" : "send removed key informations via mail"
                            },
                            {
                                "name" : "subscriptions",
                                "description" : "send subscriptions informations via mail"
                            },
                            {
                                "name" : "supporters",
                                "description" : "send supporters informations via mail"
                            },
                            {
                                "name" : "extras",
                                "description" : "send extras informations via mail"
                            }
                        ]
                    },
                    {
                        "name" : "weather",
                        "actions" : [
                            {
                                "name" : "login",
                                "description" : "login a key"
                            },
                            {
                                "name" : "logout",
                                "description" : "logout current key"
                            },
                            {
                                "name" : "refresh",
                                "description" : "refresh current key"
                            },
                            {
                                "name" : "city",
                                "description" : "change city to get weather"
                            },
                            {
                                "name" : "unit",
                                "description" : "change unit to get weather"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "login",
                                "description" : "send new key added via mail"
                            },
                            {
                                "name" : "city",
                                "description" : "send new city informations via mail"
                            },
                            {
                                "name" : "unit",
                                "description" : "send new unit informations via mail"
                            },
                            {
                                "name" : "logout",
                                "description" : "send removed key informations via mail"
                            }
                        ]
                    },
                    {
                        "name" : "mail",
                        "actions" : [
                            {
                                "name" : "send email",
                                "description" : "send email with subject / email / message"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "send custom email",
                                "description" : "send custom email to logged user"
                            }
                        ]
                    },
                    {
                        "name" : "epitech",
                        "actions" : [
                            {
                                "name" : "login",
                                "description" : "login user with key"
                            },
                            {
                                "name" : "logout",
                                "description" : "logout user"
                            },
                            {
                                "name" : "refresh",
                                "description" : "user registered key"
                            },
                            {
                                "name" : "user",
                                "description" : "get current user logged informations"
                            },
                            {
                                "name" : "notifications",
                                "description" : "get user registerd notifications"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "user",
                                "description" : "send current logged user informations via mail"
                            },
                            {
                                "name" : "play",
                                "description" : "play song when searchin for user data"
                            },
                            {
                                "name" : "notifications",
                                "description" : "send current logged user notifications via mail"
                            }
                        ]
                    },
                    {
                        "name" : "crypto",
                        "actions" : [
                            {
                                "name" : "crypto",
                                "description" : "get current crypto value"
                            },
                            {
                                "name" : "USD",
                                "description" : "get current USD value"
                            },
                            {
                                "name" : "Euro",
                                "description" : "get current Euro value"
                            },
                            {
                                "name" : "CHF",
                                "description" : "get current CHF value"
                            },
                            {
                                "name" : "CAD",
                                "description" : "get current CAD value"
                            },
                            {
                                "name" : "BPS",
                                "description" : "get current BPS value"
                            },
                            {
                                "name" : "historical",
                                "description" : "get historic of crypto currencies"
                            }
                        ],
                        "reactions" : [
                            {
                                "name" : "crypto",
                                "description" : "send current crypto value via mail"
                            },
                            {
                                "name" : "historical",
                                "description" : "send historic of crypto currencies via mail"
                            }
                        ]
                    }
                ]
            }
        }
