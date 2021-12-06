const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');
const {
	guildId,
	clientId,
	token,
	vipBossRoleId,
	staffRoleId,
	vipCommandId
} = require('./config.json');


const teamBotIntents = new Intents();
teamBotIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: teamBotIntents });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		command.data.setDefaultPermission(false);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);


			console.log('Successfully registered application commands.');
		}
		catch (error) {
			console.error(error);
		}
	})();
	client.application?.commands.permissions.set({ guild: guildId, command: vipCommandId,
		permissions: [
		  {
			id: staffRoleId,
			type: 'ROLE',
			permission: true,
		  },
		  {
		   id: vipBossRoleId,
		   type: 'ROLE',
		   permission: true,
		 },
	   ]})
		 .then(console.log('Successfully registered application command\'s perms.'))
		 .catch(console.error);
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'there was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);

