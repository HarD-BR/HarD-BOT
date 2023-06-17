const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const { EmbedBuilder }          = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.skipto.command)
    .setDescription(Language.skipto.description)
    .addNumberOption((option) => option.setName(Language.skipto.name).setDescription(Language.skipto.option).setMinValue(1).setRequired(true)),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                const number = interaction.options.getNumber(Language.skipto.name)
                if (number > queue.tracks.size) return await interaction.editReply(Language.system.invalidopt)
        
                const song  = queue.currentTrack
        
                queue.node.skipTo(number -1)
                await interaction.editReply({
                    embeds: [new EmbedBuilder().setDescription(
                    Language.skipto.notify + number + `\n` +
                    Language.queue.playing + `[${song.title}](${song.url})\n\n` +
                    Language.song.duration + song.duration + `\n` +
                    Language.song.requestedby + `<@${song.requestedBy.id}>`
                    )]
                })
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}