const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.shuffle.command)
    .setDescription(Language.shuffle.description),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                queue.tracks.shuffle()
                await interaction.editReply(Language.shuffle.notify + queue.tracks.size)
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}