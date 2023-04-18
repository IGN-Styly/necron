const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function IsLink(tag) {
  var user = await prisma.user.findMany({
    where: {
      tag: tag,
    },
  });
  return user;
}

module.exports = {
   data: new SlashCommandBuilder()
  .setName("link")
  .setDescription(
    "Provides information about the user if linked with minecraft"
  )
  .addUserOption((option) => option.setName("ign").setDescription("Their discord").setRequired(true)
  ),
  async execute(interaction) {
  const usr = await IsLink(interaction.options.getUser("ign").tag);
  const fail = new EmbedBuilder(
    {
      "title": "Verification Status",
      "color": 15961000,
      "description": `[${interaction.options.getUser("ign").tag}] Isn't Verified`,
      "timestamp": "",
      "author": {
        "name": "Necron"
      },
      "image": {},
      "thumbnail": {},
      "footer": {},
      "fields": []
    }
  );

  const link = new EmbedBuilder({
    "title": "How to Link My account",
    "color": 7440858,
    "description": "1. Type \"/profile\" in the in-game chat and press enter\n2. Find the icon called \"Social Media\"\n3. Find the icon called \"Discord\"\n4. Go to the Discord app and click on your name on the bottom left to copy your Discord tag\n5. Go back in game and paste that copied tag in the chat\n6. If a book pops up, click \"I understand\"",
    "timestamp": "",
    "url": "https://www.youtube.com/watch?v=gqUPbkxxKLI",
    "author": {},
    "image": {},
    "thumbnail": {
      "url": "https://hypixel.net/styles/hypixel-v2/images/header-logo.png"
    },
    "footer": {},
    "fields": []
  });
  if (await usr === undefined || usr.length == 0) {
    // await interaction.reply(`User [${interaction.options.getUser("ign")}] Does not have an Account Linked`);
    await interaction.reply({
      embeds: [fail, link],
    });
    return;
  }

  const success = new EmbedBuilder({
    "title": "Verification Status",
    "color": 10937249,
    "description": `[${interaction.options.getUser("ign").tag}] Is verified and owns [${usr[0].user}]`,
    "timestamp": "",
    "author": {
      "name": "Necron"
    },
    "image": {},
    "thumbnail": {},
    "footer": {},
    "fields": []
  });
  await interaction.reply({
    embeds: [success],
  });
  return;
  // await interaction.reply(`User [${interaction.options.getUser("ign")}] owns the account with the IGN [${usr.user}]`);
}}
