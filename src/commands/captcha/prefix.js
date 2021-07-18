const Discord = require('discord.js');
const Command = require('../../base/Command');
let mod_blue = "https://cdn.discordapp.com/emojis/773162250877665291.png?v=1";

module.exports = class Prefix extends Command {
    constructor() {
        super({
            name: 'prefix',
            permissions: {
                user: ["ADMINISTRATOR"],
                bot: ["MANAGE_ROLES"]
            },
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    let lang = ctx.language.komutlar.prefix;
                    let p = ctx.input.args[0]
                    if (!p) return ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} **${lang["descc"](data.prefix)}**`).setFooter(`${lang["footer"](data.prefix)}`, mod_blue));
                    if (p == "-" || p == "reset") { 
                        data.prefix = "-";
                        data.save();
                        ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} **${lang["sfr"]}**`)); 
                        return;
                    }
                    if (p) {
                        data.prefix = p;
                        data.save();
                        ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} **${lang["suc"](p)}**`))
                        return;
                    }
            
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}