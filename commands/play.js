const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMasterPlayer }       = require("discord-player")
const { EmbedBuilder }          = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.play.command)
    .setDescription(Language.play.description)
    .addStringOption((option) => option.setName(Language.play.name).setDescription(Language.play.option).setRequired(true))
    ,
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const channel = interaction.member.voice.channel
        if (!channel) return interaction.editReply(Language.play.nochannel)

        const queue = await player.nodes.create(interaction.guild)
        if (!queue.connection) await queue.connect(channel)

        let embed = new EmbedBuilder()

        let music = interaction.options.getString(Language.play.name, true)
        const result = await player.search(music, {
            requestedBy: interaction.user,
        })

        if (!result.hasTracks()) {
            return interaction.editReply(Language.play.noresult)
        }else{
            try{
                await player.play(channel, result, {
                    nodeOptions: {
                        metadata: interaction
                    }
                })
                await interaction.editReply(Language.play.loading)
                embed
                    .setDescription(`**[${result.tracks[0].title}](${result.tracks[0].url})**` + Language.play.songadded+ `\n\n\n` +
                                        Language.song.requestedby + `<@${result.requestedBy.id}>`)
                    .setThumbnail(result.tracks[0].thumbnail)
                    .setFooter({ text: Language.song.duration + `${result.tracks[0].duration}`})
                await interaction.editReply({
                    embeds: [embed]
                })
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}