const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Stop extends Command {
    constructor() {
        super({
            name: 'durdur',
            aliases: ["stop", "dur"],
            permissions: {
                user: ['ADMINISTRATOR']
            },
            run: async (ctx) => {
                try {
                    let lang = ctx.language.komutlar.stop;
                    let data = await global.dbget(ctx.guild.id);
                    
                    if (data.system !== 'working') return ctx.send(ctx.embed().setDescription(`${ctx.emoji('settings')} **${lang["notWork"]}**`).setTitle(`${lang["notWork"]}!`))
                    require('../../mongo/functions.js').Reset(ctx.guild.id);
                    ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} ${lang["stopped"]}`).setTitle(`${lang["suc"]}!`).setColor(ctx.renk.capt))
                
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}