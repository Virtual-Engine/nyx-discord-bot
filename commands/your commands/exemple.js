const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, Discord, TextInputBuilder, TextInputStyle, ActionRowBuilder, channels } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exemple')
        .setDescription('exemple commands'),
    async execute(interaction, client) {
        try {

            const EmbedSay = new EmbedBuilder()
                .setTitle(`Ping`)
                .setDescription(`\`\`\`text\`\`\``)
                .setColor(process.env.color);

            interaction.reply({ embeds: [EmbedSay] })

        } catch (error) {
            console.log(error);
        }
    },
};