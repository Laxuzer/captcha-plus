const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Invite extends Command {
    constructor() {
        super({
            name: 'davet',
            aliases: ["invite", "inv", "invite-bot", "davet-et"],
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    if (data.language == "tr") {
                        ctx.send(
                            new Discord.MessageEmbed()
                            .setDescription(
                                `${ctx.emoji('sag_ok')} [Davet Et](https://discord.com/api/oauth2/authorize?client_id=773134803527663637&permissions=8&scope=bot)
                                ${ctx.emoji('sag_ok')} [Destek Sunucusu](https://discord.gg/YRcTBQymms)
                                ${ctx.emoji('sag_ok')} [Oy Ver](https://top.gg/bot/773134803527663637/vote)`
                            )
                            .setAuthor(ctx.author.tag, ctx.author.displayAvatarURL({dynamic: true}))
                            .setThumbnail(ctx.client.user.displayAvatarURL())
                            .setColor(ctx.renk.capt)
                        )
                    }
                    if (data.language == "en") {
                        ctx.send(
                            new Discord.MessageEmbed()
                            .setDescription(
                                `${ctx.emoji('sag_ok')} [Invite](https://discord.com/api/oauth2/authorize?client_id=773134803527663637&permissions=8&scope=bot)
                                ${ctx.emoji('sag_ok')} [Support Server](https://discord.gg/YRcTBQymms)
                                ${ctx.emoji('sag_ok')} [Vote](https://top.gg/bot/773134803527663637/vote)`
                            )
                            .setAuthor(ctx.author.tag, ctx.author.displayAvatarURL({dynamic: true}))
                            .setThumbnail(ctx.client.user.displayAvatarURL())
                            .setColor(ctx.renk.capt)
                        )
                    }
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}