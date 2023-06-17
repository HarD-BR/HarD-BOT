const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const { EmbedBuilder  }         = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.queue.command)
    .setDescription(Language.queue.description)
    .addNumberOption((option) => option.setName(Language.queue.name).setDescription(Language.queue.option).setMinValue(1)),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)
        if (!queue || !queue.node.isPlaying()){
            return await interaction.editReply(Language.queue.nosongs)
        }

        const page_total = Math.ceil(queue.tracks.size / 10) || 1
        const page = (interaction.options.getNumber(Language.queue.name) || 1) - 1

        if (page > page_total) {
            return await interaction.editReply(Language.queue.nopage)
        }else{
            try{
                const song_page = queue.tracks.toArray().slice(page * 10, page * 10 + 10).map((song, i) => {
                    return `**${page * 10 + i +1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
                }).join("\n")
        
                const currentSong = queue.currentTrack
        
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`**` + Language.queue.playing + `**\n` +
                            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : Language.queue.nosongs) +
                            `\n\n**`+ Language.queue.title + `**\n${song_page}`
                            )
                            .setFooter({
                                text: Language.queue.footer + (page + 1) + Language.queue.footer2 + page_total
                            })
                            .setThumbnail(currentSong.thumbnail)
                    ]
                })
            }catch (e) {
                return interaction.followUp(Language.system.error + e)
            }
        }


    }
}