const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const vipUtils = require('./utils/vip.utils.js');
const { allowedCommandChannelId, devChannelId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Admin commands')
    .addSubcommandGroup(subcommandGroup =>
        subcommandGroup
            .setName('vip')
            .setDescription('Utility commands')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('add')
                    .setDescription('Add VIP for HLL Servers.')
                    .addStringOption(option =>
                        option.setName('steamid')
                            .setDescription('Member\'s Steam Id to add VIP to HLL servers.')
                            .setRequired(true))
                    .addStringOption(option =>
                        option.setName('description')
                            .setDescription('At minimum add players name.')
                            .setRequired(true)),
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('remove')
                    .setDescription('Remove VIP from HLL Servers.')
                    .addStringOption(option =>
                        option.setName('steamid')
                            .setDescription('Member\'s Steam Id to remove VIP from HLL servers.')
                            .setRequired(true)),
            )
    ),
	async execute(interaction) {
		const steamId = interaction.options.getString('steamid');
        const description = interaction.options.getString('description');
		if (interaction.commandName === 'admin') {
            const re = /^\d{17}$/;
            if (re.test(steamId)) {
                if (interaction.options.getSubcommand() === 'add') {
                    return vipUtils.addVIP(interaction, steamId, description);
                }
                else if (interaction.options.getSubcommand() === 'remove') {
                    return vipUtils.removeVIP(interaction, steamId);
                }
            }
            else {
                interaction.reply({ 
                    content: `❌ ${steamId} is not a proper Steam ID. Please check and try again.`,
                    ephemeral: true,
                });
                /**
                interaction.guild.commands.fetch()
                .then(console.log)
                .catch(console.error);
                */
        }
		}
	},
};
