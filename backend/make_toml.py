import tomli_w

config = {
    "title": "My App",
    "database": {
        "host": "localhost",
        "port": 5432,
        "enabled": True,
    },
}

with open("secure.toml", "wb") as f:
    tomli_w.dump(config, f)
