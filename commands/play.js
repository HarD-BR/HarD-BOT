const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMainPlayer }         = require("discord-player")
const { EmbedBuilder }          = require("discord.js")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.play.command)
    .setDescription(Language.play.description)
    .addStringOption((option) => option.setName(Language.play.name).setDescription(Language.play.option).setRequired(true))
    ,
    run: async ({ interaction }) => {
        const player = useMainPlayer()
        const channel = interaction.member.voice.channel
        if (!channel) return interaction.editReply(Language.play.nochannel)

        const queue = await player.nodes.create(interaction.guild)
        if (!queue.connection) await queue.connect(channel)

        let embed = new EmbedBuilder()

        let music = interaction.options.getString(Language.play.name, true)
        const result = await player.search(music.split('&pp=')[0], {
            requestedBy: interaction.user,
        })
        console.log(result.tracks[0]) // Debug log
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
                if(result.tracks.length > 1){
                    let playlist_dur = 0;
                    for (let i = 0; i < result.tracks.length; i++){
                        playlist_dur += parseInt(result.tracks[i].duration);
                    }
                    embed
                    .setDescription(`**[${result.playlist.title}](${result.tracks[0].url}) - (${result.tracks.length})**` + Language.play.songadded+ `\n\n\n` +
                                        Language.song.requestedby + `<@${result.requestedBy.id}>` + `\n` +
                                        Language.song.provider + result.tracks[0].source)
                    .setThumbnail(result.tracks[0].thumbnail)
                    .setFooter({ text: Language.song.duration + result.playlist.durationFormatted})
                    await interaction.editReply({
                        embeds: [embed]
                    })
                }else {
                embed
                    .setDescription(`**[${result.tracks[0].title}](${result.tracks[0].url})**` + Language.play.songadded + `\n\n\n` +
                                        Language.song.requestedby + `<@${result.requestedBy.id}>` + `\n` +
                                        Language.song.provider + result.tracks[0].source)
                    .setThumbnail(result.tracks[0].thumbnail)
                    .setFooter({ text: Language.song.duration + `${result.tracks[0].duration}`})
                await interaction.editReply({
                    embeds: [embed]
                })
                }
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}