const Discord   = require("discord.js")
const dotenv    = require("dotenv")
const fs        = require("fs")
const { REST }  = require("@discordjs/rest")
const { Routes }= require("discord-api-types/v9")
const { Player }= require("discord-player")
const Language = require("./strings.js")


dotenv.config()
const TOKEN     = process.env.TOKEN
const LOAD_SLASH= process.argv[2] == "!"

const CLIENT_ID = "1157314816176836708"
const GUILD_ID  = "1157300877917421678"

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildVoiceStates",
        "GuildMessages",
        "MessageContent"
    ]
})

client.slashcommands    = new Discord.Collection()
const player                  = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands    = []

const slashFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd  = require(`./commands/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest  = new REST({ version: "9"}).setToken(TOKEN)
    console.log(Language.system.loading)
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log(Language.system.success)
        process.exit(0)
    })
    .catch((e) => {
        if (e) {
            console.log(Language.system.error + e)
            process.exit(1)
        }
    })
}else {
    client.on("ready", () => {
        console.log(Language.system.logged + client.user.tag)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return
            await player.extractors.loadDefault()
            const slashcmd  = client.slashcommands.get(interaction.commandName)
            console.log(
                Language.system.run + interaction.commandName + `\n` +
                Language.system.user + interaction.user.tag + `\n` +
                Language.system.server + interaction.guild.name+ `\n` +
                "###########################")

            if (!slashcmd) interaction.reply(Language.system.notfound)

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}
