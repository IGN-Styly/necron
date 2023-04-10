const {
  SlashCommandBuilder,
  Modal,
  EmbedBuilder,
  TextInputComponent,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");
const { Events, ModalBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Links the discord tag to the Minecraft IGN"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("verify")
      .setTitle("Verify");

    const favoriteColorInput = new TextInputBuilder()
      .setCustomId("ign")
      // The label is the prompt the user sees for this input
      .setLabel("What's your Minecraft IGN?")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
      const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
      modal.addComponents(firstActionRow);
      await interaction.showModal(modal);
  },
};
