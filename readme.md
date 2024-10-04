# Nyx Bot template

This project is the basis for creating a Discord bot using Node.js and the discord.js library. It includes a simple structure for adding commands and events, as well as examples to facilitate the development of additional functionality.

# Prerequisites
Before you start, make sure you have the following installed:

Node.js (version 16.6.0 or higher for discord.js v14+)
A Discord account with permissions to create bots
A bot token that you can generate via the [Discord Developer Portal](https://discord.com/developers/applications)

# Install :

```js
npm install
```

# Configure .env file:

Rename the example-env.js file to .env and fill it with your bot token and the rest of the information:

```js
TOKEN = “the of your bot”;
category = “categorie
guild = “server id”
color = “#6600cc”
ID = “salon id”
salon_starting = “starting salon id”
```

# Starting the bot:

You can start the bot using the following command:

```js
node.
```
or
```js
node main.js
```

# Structure

```css
├── commands/       Contains all bot commands
│ └── example.js    Example of 'example' command
├── events/         Contains events (e.g. ready, messageCreate)
│ ├── music/        Contains music events
│ │ └── events.js   Creates music-related events
│ └── ready.js      Event executed when bot connects
│ └── interaction   Creates commands
│ └── message.js    Creates message commands
├── main.js         Main bot entry point
├── config.json     Contains global configuration (prefix, etc.)
├── .env            Contains environment variables (token)
├── package.json    File containing dependencies and scripts
└── readme.md       This README file
```

# Contributions
Contributions are welcome! If you have any suggestions or corrections, don't hesitate to create an issue or a pull request.
