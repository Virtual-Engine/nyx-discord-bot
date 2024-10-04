const { Events, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (message.author.bot) return;
        let embed = new EmbedBuilder();
        if (message.channel.type === ChannelType.DM) {
            const guild = await message.client.guilds.cache.get(process.env.guild);
            if (guild) {
                const category = await guild.channels.cache.get(process.env.category);
                if (category) {
                    // fetch all channels in the category to get his topic and check if the topic is the user id
                    category.children.cache.forEach(async (c) => {
                        const channel = c;
                        if (channel.topic === message.author.id) {
                            embed.setTitle(`Message from \`${message.author.username}\``);
                            embed.setDescription(`\`\`\`${message.content}\`\`\``);
                            embed.setColor(process.env.color);
                            embed.setThumbnail(message.author.displayAvatarURL());
                            await channel.send({ embeds: [embed] });
                            await message.react('✅');
                        }
                    });
                    // Create a new channel if no channel with the user's id exists
                    const existingChannel = category.children.cache.find(c => c.topic === message.author.id);
                    if (!existingChannel) {
                        const newChannel = await category.children.create({
                            name: message.author.username,
                            type: ChannelType.GuildText,
                            topic: message.author.id
                        });
                        const member = guild.members.cache.get(message.author.id);
                        embed.setTitle(`Message from \`${message.author.username}\``);
                        embed.setDescription(`\`\`\`${message.content}\`\`\``);
                        embed.setColor(process.env.color);
                        embed.setThumbnail(message.author.displayAvatarURL());
                        const button = new ButtonBuilder()
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji("❌")
                            .setLabel('Close ' + newChannel.name)
                            .setCustomId('close' + newChannel.id);
                        const button2 = new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji("📜")
                            .setLabel('Transcript ' + newChannel.name)
                            .setCustomId('transcript' + newChannel.id)
                            .setDisabled(true);
                        const row = new ActionRowBuilder().addComponents(button, button2);
                        const embed2 = new EmbedBuilder()
                            .setColor(process.env.color)
                            .setTitle('New ModMail from \`' + message.author.username + '\`')
                            .setDescription(`✅ Created a new channel for ${message.author.username}!\nTo Speak with \`` + member.user.username + '\`, you juste have to speak in the channel, and messages will be sent to this member !')
                            .setTimestamp()
                            .setThumbnail(message.author.displayAvatarURL());
                        await newChannel.send({ embeds: [embed2], components: [row] });
                        await newChannel.send({ embeds: [embed] });
                        await message.react('✅');
                    }
                }
            }
        }
        else {
            if (message.channel.parentId === process.env.category) {
                if (message.channel.type === ChannelType.GuildText) {
                    if (message.channel.topic !== null) {
                        const member = await message.guild.members.cache.get(message.channel.topic);
                        if (member) {
                            const highestrole = member.roles.highest.name;
                            embed.setTitle(`Message from \`${highestrole} | ${message.author.username}\``);
                            embed.setDescription(`\`\`\`${message.content}\`\`\``);
                            embed.setColor(process.env.color);
                            embed.setThumbnail(message.author.displayAvatarURL());
                            embed.setFooter({ text: "ModMail © 2024 - All rights reserved." });
                            await message.react('✅');
                            await member.send({ embeds: [embed] });
                        }
                    }
                }
            }
        }
    },
};