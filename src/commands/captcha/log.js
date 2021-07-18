const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Log extends Command {
    constructor() {
        super({
            name: 'log',
            aliases: ["log-channel", "log-kanal"],
            permissions: {
                user: ["ADMINISTRATOR"],
                bot: ["MANAGE_CHANNELS"]
            },
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    let lang = ctx.language.komutlar.log;
            
                    let kanal = ctx.message.mentions.channels.first() || ctx.message.guild.channels.cache.get(ctx.input.args[0]);
            
                    if (!kanal) return ctx.send(ctx.embed().setDescription(`${ctx.emoji('cross')} **${lang["arg"]}**`).setTitle(`${lang["invarg"]}`))
                    data.log = kanal.id;
                    data.save();
                    ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} **${lang["suc"](kanal.id)}**`).setTitle(`${lang["bas"]}!`))
                    
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}