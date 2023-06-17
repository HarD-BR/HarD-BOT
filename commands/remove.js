const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const { EmbedBuilder }          = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.remove.command)
    .setDescription(Language.remove.description)
    .addNumberOption((option) => option.setName(Language.remove.name).setDescription(Language.remove.option).setMinValue(1).setRequired(true)),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                const number = interaction.options.getNumber(Language.remove.name)
                if ( !queue.tracks[number] ) return await interaction.editReply(Language.system.invalidopt)
        
                queue.node.remove(number -1)
                await interaction.editReply({
                    embeds: [new EmbedBuilder().setDescription(
                    Language.remove.notify + number
                    )]
                })
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}