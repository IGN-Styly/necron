const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function IsLink(tag) {
  var user = await prisma.user.findMany({
    where: {
      tag: tag,
    },
  });
  return user[0]
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("islinked")
    .setDescription(
      "Provides information about the user if linked with minecraft"
    )
    .addUserOption((option) =>
      option.setName("ign").setDescription("Their discord").setRequired(true)
    ),

  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    if (await IsLink(interaction.options.getUser("ign").tag) === undefined) {
      await interaction.reply(`User [${interaction.options.getUser("ign")}] Does not have an Account Linked`);
      return
    }
    const usr= await IsLink(interaction.options.getUser("ign").tag)

    await interaction.reply(`User [${interaction.options.getUser("ign")}] owns the account with the IGN [${usr.user}]`);
  },
};
