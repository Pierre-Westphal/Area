# Area: Year End Project

Info for the project at the end the file.
## Api Routes

```JSON
{
  "status_code": 2,
  "text": {
    "routes": [
      {
        "/api/github_login/github/authorized": "\n        This is the route/function that the user will be redirected to by\n        the provider (e.g. Twitter) after the user has logged into the\n        provider's website and authorized your app to access their account.\n        "
      },
      {
        "/api/beta/spotify/playlists": null
      },
      {
        "/api/beta/spotify/playing": null
      },
      {
        "/api/beta/spotify/logout": null
      },
      {
        "/api/beta/spotify/login": null
      },
      {
        "/api/beta/spotify/user": null
      },
      {
        "/api/github_login/github": null
      },
      {
        "/api/database/login": null
      },
      {
        "/api/epitech/notifications": null
      },
      {
        "/api/spotify/playlists": null
      },
      {
        "/api/spotify/callback": null
      },
      {
        "/api/epitech/refresh": null
      },
      {
        "/api/weather/refresh": null
      },
      {
        "/api/spotify/logout": null
      },
      {
        "/api/spotify/albums": null
      },
      {
        "/api/weather/logout": null
      },
      {
        "/api/spotify/login": null
      },
      {
        "/api/epitech/login": null
      },
      {
        "/api/weather/login": null
      },
      {
        "/api/epitech/user": null
      },
      {
        "/api/coffee/subscriptions": null
      },
      {
        "/api/github/repositories": null
      },
      {
        "/api/coffee/supporters": null
      },
      {
        "/api/github/callback": null
      },
      {
        "/api/coffee/refresh": null
      },
      {
        "/api/coffee/logout": null
      },
      {
        "/api/coffee/extras": null
      },
      {
        "/api/github/login": null
      },
      {
        "/api/coffee/login": null
      },
      {
        "/api/github/user": null
      },
      {
        "/google/callback": null
      },
      {
        "/google/login": null
      },
      {
        "/api/about.json": null
      },
      {
        "/api/reactions": null
      },
      {
        "/api/reactions": null
      },
      {
        "/api/weather": null
      },
      {
        "/api/coffee": null
      },
      {
        "/api/crypto": null
      },
      {
        "/api/routes": null
      },
      {
        "/api/mail": null
      },
      {
        "/": null
      },
      {
        "/api/beta/spotify/search/playlist/<item>": null
      },
      {
        "/api/beta/spotify/search/artist/<item>": null
      },
      {
        "/api/beta/spotify/search/album/<item>": null
      },
      {
        "/api/beta/spotify/search/track/<item>": null
      },
      {
        "/api/spotify/search/playlist/<item>": null
      },
      {
        "/api/spotify/search/artist/<item>": null
      },
      {
        "/api/spotify/search/album/<item>": null
      },
      {
        "/api/spotify/search/track/<item>": null
      },
      {
        "/api/weather/unit/<unit>": null
      },
      {
        "/api/weather/city/<city>": null
      },
      {
        "/api/github/repositories/<owner>": null
      },
      {
        "/api/github/branches/<owner>/<repository>": null
      },
      {
        "/api/crypto/historic/<begin>/<end>": null
      },
      {
        "/api/github/actions/<owner>/<repository>": null
      },
      {
        "/api/github/events/<owner>/<repository>": null
      },
      {
        "/api/github/user/<username>": null
      },
      {
        "/api/crypto/<name>": null
      }
    ]
  }
}

```

```JSON
{
  "client": {
    "host": "0.0.0.0"
  },
  "server": {
    "current_time": 1646751613,
    "services": [
      {
        "actions": [
          {
            "description": "login user",
            "name": "login"
          },
          {
            "description": "logout user",
            "name": "logout"
          },
          {
            "description": "get informations about current logged user",
            "name": "user"
          },
          {
            "description": "search artist on spotify",
            "name": "search artist"
          },
          {
            "description": "search album on spotify",
            "name": "search album"
          },
          {
            "description": "search track on spotify",
            "name": "search track"
          },
          {
            "description": "search playlist on spotify",
            "name": "search playlist"
          },
          {
            "description": "get saved playlists",
            "name": "playlists"
          },
          {
            "description": "get saved albums",
            "name": "albums"
          },
          {
            "description": "get track currently played",
            "name": "playing"
          }
        ],
        "name": "spotify",
        "reactions": [
          {
            "description": "send user informations via mail",
            "name": "user"
          },
          {
            "description": "send albums informations via mail",
            "name": "album"
          },
          {
            "description": "send playlists informations via mail",
            "name": "playlist"
          },
          {
            "description": "send artist informations via mail",
            "name": "artist"
          },
          {
            "description": "send tracks informations via mail",
            "name": "track"
          },
          {
            "description": "send saved albums informations via mail",
            "name": "albums"
          },
          {
            "description": "send saved playlists informations via mail",
            "name": "playlists"
          },
          {
            "description": "send saved artists informations via mail",
            "name": "artists"
          }
        ]
      },
      {
        "actions": [
          {
            "description": "get informations about current logged user",
            "name": "get user"
          },
          {
            "description": "get all repositories from someone",
            "name": "get repositories"
          },
          {
            "description": "get all actions from someone's repository",
            "name": "get actions"
          },
          {
            "description": "get all branches from someone's repository",
            "name": "get branches"
          },
          {
            "description": "get all events from someone's repository",
            "name": "get events"
          }
        ],
        "name": "github",
        "reactions": [
          {
            "description": "send current user informations via mail",
            "name": "user"
          },
          {
            "description": "send searched user informations via mail",
            "name": "search user"
          },
          {
            "description": "send repositories list informations via mail",
            "name": "repositories"
          },
          {
            "description": "send actions informations via mail",
            "name": "actions"
          },
          {
            "description": "send branches informations via mail",
            "name": "branches"
          },
          {
            "description": "send events informations via mail",
            "name": "events"
          },
          {
            "description": "follow Neo when you search for github user informations",
            "name": "follow Neo"
          }
        ]
      },
      {
        "actions": [
          {
            "description": "login a key",
            "name": "login"
          },
          {
            "description": "logout current key",
            "name": "logout"
          },
          {
            "description": "refresh current key",
            "name": "refresh"
          },
          {
            "description": "get current subscriptions",
            "name": "subscriptions"
          },
          {
            "description": "get current supporters",
            "name": "supporters"
          },
          {
            "description": "get current extras",
            "name": "extras"
          }
        ],
        "name": "coffee",
        "reactions": [
          {
            "description": "send new key registered via mail",
            "name": "login"
          },
          {
            "description": "send removed key informations via mail",
            "name": "logout"
          },
          {
            "description": "send subscriptions informations via mail",
            "name": "subscriptions"
          },
          {
            "description": "send supporters informations via mail",
            "name": "supporters"
          },
          {
            "description": "send extras informations via mail",
            "name": "extras"
          }
        ]
      },
      {
        "actions": [
          {
            "description": "login a key",
            "name": "login"
          },
          {
            "description": "logout current key",
            "name": "logout"
          },
          {
            "description": "refresh current key",
            "name": "refresh"
          },
          {
            "description": "change city to get weather",
            "name": "city"
          },
          {
            "description": "change unit to get weather",
            "name": "unit"
          }
        ],
        "name": "weather",
        "reactions": [
          {
            "description": "send new key added via mail",
            "name": "login"
          },
          {
            "description": "send new city informations via mail",
            "name": "city"
          },
          {
            "description": "send new unit informations via mail",
            "name": "unit"
          },
          {
            "description": "send removed key informations via mail",
            "name": "logout"
          }
        ]
      },
      {
        "actions": [
          {
            "description": "send email with subject / email / message",
            "name": "send email"
          }
        ],
        "name": "mail",
        "reactions": [
          {
            "description": "send custom email to logged user",
            "name": "send custom email"
          }
        ]
      },
      {
        "actions": [
          {
            "description": "login user with key",
            "name": "login"
          },
          {
            "description": "logout user",
            "name": "logout"
          },
          {
            "description": "user registered key",
            "name": "refresh"
          },
          {
            "description": "get current user logged informations",
            "name": "user"
          },
          {
            "description": "get user registerd notifications",
            "name": "notifications"
          }
        ],
        "name": "epitech",
        "reactions": [
          {
            "description": "send current logged user informations via mail",
            "name": "user"
          },
          {
            "description": "play song when searchin for user data",
            "name": "play"
          },
          {
            "description": "send current logged user notifications via mail",
            "name": "notifications"
          }
        ]
      },
      {
        "actions": [
          {
            "description": "get current crypto value",
            "name": "crypto"
          },
          {
            "description": "get current USD value",
            "name": "USD"
          },
          {
            "description": "get current Euro value",
            "name": "Euro"
          },
          {
            "description": "get current CHF value",
            "name": "CHF"
          },
          {
            "description": "get current CAD value",
            "name": "CAD"
          },
          {
            "description": "get current BPS value",
            "name": "BPS"
          },
          {
            "description": "get historic of crypto currencies",
            "name": "historical"
          }
        ],
        "name": "crypto",
        "reactions": [
          {
            "description": "send current crypto value via mail",
            "name": "crypto"
          },
          {
            "description": "send historic of crypto currencies via mail",
            "name": "historical"
          }
        ]
      }
    ]
  }
}

```

## Login

You need to provide a correct email
Some notifications are linked to you email
All keys / reactions are linked to you email
If an account isn't in database with your emal
a new one will be created, else if the  password matches
you will be logged

## Github

Logon once for the database
and one more for the frontend

## Coffee

By default a key is provided
to change the key linked: click on refresh after entering a key
the key will be linked to your profile

## Epitech Key

<p align = "left">
    <a href = "https://github.com/Neotoxic-off/epytech">API</a>
</p>
<p align = "left">
    <a href = "https://intra.epitech.eu/admin/autolog?format=json">Autologin</a>
</p>

How to get the key:

- Go on the `autologin` website
- Response:
```JSON
{
    "autologin": "https:\/\/intra.epitech.eu\/auth-c******************0"
}
```
- Copy from the `c` to the `0`
- Here u have your key: `c****************0`

to change the key linked: click on refresh after entering a key
the key will be linked to your profile

## Github

Github login requires to be clicked twice
So after you clicked on the login button, click again on the login button

## Customize Reactions
- Go in notifications
- Click to activate / deactivate reactions linked to this service

## Server Host Address

`https://area.rom4all.com`
