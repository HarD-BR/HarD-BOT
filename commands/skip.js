const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMainPlayer }         = require("discord-player")
const { EmbedBuilder }          = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.skip.command)
    .setDescription(Language.skip.description),
    run: async ({ interaction }) => {
        const player = useMainPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                const song  = queue.currentTrack

                queue.node.skip()
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setDescription(Language.skip.notify)
                        .setThumbnail(song.thumbnail)
                    ]
                })
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}