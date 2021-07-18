const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Language extends Command {
    constructor() {
        super({
            name: 'dil',
            aliases: ["lang", "language", "dilseç"],
            permissions: {
                user: ['ADMINISTRATOR']
            },
            run: async (ctx) => {
                try {
                    let dil = ctx.input.args[0];
                    let data = await global.dbget(ctx.guild.id);
                    if (!dil) return ctx.send(ctx.embed().addField(`:flag_us: __**English**__`, `> \`${data.prefix}lang en\``, true).addField(`:flag_tr: __**Turkish**__`, `> \`${data.prefix}dil tr\``, true))
                    if(dil.toLowerCase() == "tr") {
                        data.language = "tr";
                        data.save();
                        ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} Botun dilini \`Türkçe\` ayarladım.`).setTitle(`Başarılı!`))
                    };
                    if(dil.toLowerCase() == "en") {
                        data.language = "en";
                        data.save();
                        ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} I set the bot\'s language to \`English\`.`).setTitle(`Succes!`))
                    };
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}