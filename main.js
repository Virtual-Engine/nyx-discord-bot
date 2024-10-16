const fs = require('node:fs');
const path = require('node:path');
const { log } = require("nyx-logger");
const { REST, Routes, IntentsBitField, Partials } = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const colors = require("colors")
const intent = require('./intents');

require('dotenv').config();

console.log(colors.blue(`
░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░`))

log("done", "Initialize Nyx");
log("dev", `Categorie ID : ${process.env.category}`);
log("dev", `Server ID : ${process.env.guild}`);
log("dev", `Client ID : ${process.env.ID}`);

const client = new Client({ intents: intent, partials: [Partials.Message, Partials.Channel] });
client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		} else {
			log("warn", `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
		}
	}
}
const rest = new REST().setToken(process.env.TOKEN);
(async () => {
	try {

		log("info", `Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(process.env.ID),
			{ body: commands },
		);

		log("done", `Successfully reloaded ${data.length} application (/) commands`);
	} catch (error) {
		log(error, "err");
	}
})();

client.login(process.env.TOKEN);
