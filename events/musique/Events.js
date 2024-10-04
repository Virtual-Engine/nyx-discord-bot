const { EmbedBuilder } = require('discord.js');
const { log } = require("nyx-logger");

module.exports = async (client) => {

    log("info", `Events Musique Started`);

    const Embed = new EmbedBuilder()
        .setColor(process.env.color)

    client.player.events.on('playerStart', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅| Je vais commence à jouer: **${track.title}** 🔊`)] });
    });

    client.player.events.on('audioTrackAdd', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | La musique **${track.title}** as bien été ajouté à la file d'attente !`)] });
    });

    client.player.events.on('audioTracksAdd', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | Plusieurs musique ajouté à la file d'attente !`)] });
    });

    client.player.events.on('playerSkip', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | **${track.title}** ignoré un problème est survenu !`)] });
    });

    client.player.events.on('disconnect', (queue) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`❌ | J'ai fini de jouer les musique, je me déconnecte du salons !`)] });
    });

    client.player.events.on('emptyChannel', (queue) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`❌ | Personne n'est dans le canal vocal, je quitte le canal vocal !`)] });
    });

    client.player.events.on('emptyQueue', (queue) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | J'ai fini de joue toute la file d'attente !`)] });
    });

    client.player.events.on('error', (queue, error) => {
        log(`Événement d'erreur générale du joueur: ${error.message}`, "err");
        log(error, "err");
    });

    client.player.events.on('playerError', (queue, error) => {
        log(`Événement d'erreur du joueur: ${error.message}`, "err");
        log(error, "err");
    });
}