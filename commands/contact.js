const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Replies with important information about Necron Bot'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Confirm')
					.setStyle("Primary")
                    .setCustomId("about")

			)
		await interaction.reply({content: 'TODO', components: [row],ephemeral: true}); // TODO: make it reply with an embed and say more info
    },
};
