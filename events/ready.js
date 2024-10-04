const { Discord, ActivityType, Events, EmbedBuilder, Client } = require('discord.js');
const moment = require('moment')
const { log } = require("nyx-logger");
const fs = require('node:fs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        log("info", `Login : ${client.user.username}`);
        log("done", `Embed Starting Send At ${process.env.salon_starting}`);

        const Embed = new EmbedBuilder()
            .setTitle("**Starting L0yy**")
            .setDescription(`L0yy c'est connecte a ${moment().format("HH:mm:ss YYYY-MM-DD")}`)
            .setColor("#7f00ff")
            .setTimestamp()

        client.channels.cache.get(process.env.salon_starting).send({ embeds: [Embed] })

        client.user.setPresence({
            activities: [{ name: 'The best bot', type: ActivityType.Streaming, url: "https://www.twitch.tv/punisherenlive" }],

        });

    },
};