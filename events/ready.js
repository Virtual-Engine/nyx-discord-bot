const { Discord, ActivityType, Events, EmbedBuilder, Client } = require('discord.js');
const moment = require('moment')
const { log } = require("nyx-logger");
const fs = require('node:fs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        log("info", `Login : ${client.user.username}`);
    },
};
