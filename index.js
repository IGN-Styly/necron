const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  APIApplicationCommandPermissionsConstant,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config()
const hypixel_API = process.env.hypixel_API
const token = process.env.token
const { hypixelApi } = require("./api.js");
const { PrismaClient } = require('@prisma/client');
const hypixel = "https://api.hypixel.net/player";


const prisma = new PrismaClient()
async function Link(user, tag) {
  await prisma.user.create({data:{user: `${user}`, tag: `${tag}` }})

}
async function IsLink(tag){
  var user =await prisma.user.findMany({
    where:{
      tag:tag
    }
    
  })
  return user
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log("[Ready]: Connected to discord as " + client.user.tag);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand) return;

  if (interaction.customId == "about") {
    interaction.reply({ content: "you clicked me!🤦", ephemeral: true });
  }
  if (interaction.isModalSubmit()) {
    if (interaction.customId == "verify") {
      const ok = new EmbedBuilder({
        "title": "You Are Now Verified",
        "color": 10937249,
        "timestamp": "",
        "author": {
          "name": "Necron"
        },
        "image": {},
        "thumbnail": {},
        "footer": {},
        "fields": []
      })
      const notok = new EmbedBuilder({
        "title": `Verification Failed! \n Try Again`,
        "color": 15961000,
        "timestamp": "",
        "author": {
          "name": "Necron"
        },
        "image": {},
        "thumbnail": {},
        "footer": {},
        "fields": []
      })
      const already = new EmbedBuilder({
        "title": `You are already Verified`,
        "color": 15961000,
        "timestamp": "",
        "author": {
          "name": "Necron"
        },
        "image": {},
        "thumbnail": {},
        "footer": {},
        "fields": []
      })
      const input = interaction.fields.getTextInputValue('ign')
      const res= await fetch(`https://api.mojang.com/users/profiles/minecraft/${input}`)
      const data=await res.json()

      console.log(`[GET]: Requested Player uuid from Mojang, uuid:[${data.id}] with the username:[${data.name}]`)

      var request=hypixelApi(hypixel, hypixel_API, data.id);
      if((await IsLink(interaction.user.tag)).length>0){interaction.reply({
        embeds:[already],
        ephemeral: true,
      });
    return}
    
      if (interaction.user.tag===await request){interaction.reply({
        embeds:[ok],
        ephemeral: true, 
      }
      )
      console.log(`[LINK]: Linked [${interaction.user.tag}] to [${data.name}]`)
      Link(data.name, interaction.user.tag)
      return
    }
      interaction.reply({
        embeds:[notok],
        ephemeral: true,
      });
    }
  }
});
client.login(token);
