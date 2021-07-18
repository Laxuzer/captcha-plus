const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class VerifyChannel extends Command {
    constructor() {
        super({
            name: 'verify-channel',
            aliases: ['verifychannel', 'doğrulama-kanal', 'doğrulama-kanalı'],
            permissions: {
                user: ["ADMINISTRATOR"],
                bot: ["MANAGE_CHANNELS"]
            },
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    let lang = ctx.language.komutlar.verify_channel;
            
                    let kanal = ctx.message.mentions.channels.first() || ctx.guild.channels.cache.get(ctx.input.args[0]);
            
                    if (!kanal) return ctx.send(ctx.embed().setDescription(`${ctx.emoji('cross')} **${lang["arg"]}**`).setTitle(`${lang["invarg"]}`))
                    data.verify_channel = kanal.id;
                    data.save();
                    ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} **${lang["suc"](kanal.id)}**`).setTitle(`${lang["bas"]}!`))
                    
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}