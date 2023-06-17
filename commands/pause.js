const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.pause.command)
    .setDescription(Language.pause.description),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                queue.node.pause()
                await interaction.editReply(Language.pause.notify)
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}