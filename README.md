<h1 align="center"> HarD-BOT </h1>
Music bot template for Discord
This is a fork from [discord-music-bot](https://github.com/3chospirits/discord-music-bot) made by [@3chospirits](https://github.com/3chospirits)


## Setup instructions:
1 - Install dependencies:
```
npm i dotenv discord.js discord-player @discordjs/voice @discordjs/rest @discordjs/opus @discordjs/builders play-dl ffmpeg-static
```

2 - Setup your app token to the .env file

3 - Setup your CLIENT_ID and GUILD_ID for the bot on index.js file

4 - Edit the strings.js file to your preferred language

5 - Go to https://discord.com/developers/applications/YOUR_BOT_ID/bot and enable "MESSAGE CONTENT INTENT"

6 - Go to OAuth2 and set:
  - Scopes: "applications.commands" and "bot"
  - Bot permissions: "Read Messages/View Channels", "Send Messages", "Manage Messages", "Embed Links", "Read Message History", "Use Slash Commands", "Connect" and "Speak"

7 - Now copy the URL at the bottom page and invite the bot to your server

8 - Now on the bot folder on a terminal, deploy/load the commands
```
node index.js load
```

9 - Now run the bot
```
node index.js
```

10 - Now go to your server and use the bot!

## 📝 License

Check the [LICENSE](LICENSE.md) for more details.
