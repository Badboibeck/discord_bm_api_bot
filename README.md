# Hell Let Loose (HLL) Basic RCON API Discord.js Bot

This is to help bridge the gaps between BattleMetrics and Discord Bot abilities.

It is currently a Discord Bot to add VIPs to your HLL Servers using a Discord Slash Command. It has been built out for Never Play Alone's usage rather than a broad use case.

## Pre-requistes:

- BattleMetrics API Key: https://www.battlemetrics.com/developers
- Discord Bot: https://discord.com/developers/applications
- Having some very basic linux cli knowledge.
- The below need to be installed on the server where the bot will run:
    - GIT: https://git-scm.com/downloads
    - Docker Engine installed: https://docs.docker.com/install/

## Install steps

### 1. Get the sources

    git clone https://github.com/Badboibeck/discord_bm_api_bot.git
    cd DISCORD_BM_API_BOT

### 2. Set your information

    cp config_default.json config.json
    nano config.json

    {
        "bmApiId": "BattleMetrics API Key",
        "token": "Discord Bot Token",
        "clientId": "Discord Bot ID",
        "guildId": "Discord Guild",
        "hllServers": [
            {
                "id": "Server BattleMetrics ID",
                "name": "Server Name"
            },
            {
                "id": "",
                "name": "Server"
            }
        ],
        "vipBossRoleId": "VIP Boss's Role Id for access to vip commands",
        "staffRoleId": "Staff Role ID for access to commands",
        "vipCommandId": "Once Commands are registered you have to get the command id"
    }

### 3. Build our Docker Image

    docker build -t discord_bm_api_bot:<version> .

`<version>` is the current iteration of your bot image being created. Version should start with `0.1` so the next build should be `0.2`. Don't know what image version you left off on? Try :

    docker image ls | grep discord

### 4. Run the bot
    docker run -d --name=mybot --restart=unless-stopped discord_bm_api_bot:<verson>

It will error out the first time. Since you need the command Id after adding the commands on the first run. You will want to turn off the default permissions at first to use the command to get the id. 

### More information
If you want more of a sanity check here are some following commands you can run!

```
# Get the container!
$ docker ps

# Print the logs
$ docker logs <our container's ID>
```

That will give us our information and current running logs.

## More Features?

I have not decided... Maybe a way to add admins/spectators via command. But honestly.. rather build a website that can take members SteamIds / DiscordIds / Patreon Account and be able to handle all VIP action automatically.
