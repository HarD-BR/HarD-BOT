const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const { EmbedBuilder }          = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.info.command)
    .setDescription(Language.info.description),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                let bar = queue.node.createProgressBar()

                const song = queue.currentTrack
        
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setThumbnail(song.thumbnail)
                        .setDescription(
                        Language.queue.playing + `[${song.title}](${song.url})\n\n` +
                        Language.song.duration + song.duration + `\n` +
                        Language.song.requestedby + `<@${song.requestedBy.id}> \n\n` +
                        bar)
                    ]
                })
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}