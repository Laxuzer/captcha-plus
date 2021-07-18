const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Start extends Command {
    constructor() {
        super({
            name: 'başlat',
            aliases: ['start', 'baslat'],
            permissions: {
                user: ['ADMINISTRATOR'],
                bot: ['MANAGE_ROLES']
            },
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    if (data.system == 'working') return ctx.send(ctx.embed().setDescription(ctx.language.komutlar.start.already));
                
                    let yok = ["unregistered", "registered", "verify_channel"].filter(v => !data[v]);
                    yok = yok.map(v => v.replace("log", ctx.language.database.log).replace("verify_channel", ctx.language.database.verify_channel).replace("unregistered", ctx.language.database.unregistered).replace("registered", ctx.language.database.registered))
                    if (yok.length >= 1) return ctx.send(ctx.embed().setDescription(`${ctx.emoji('cross')} ${ctx.language.komutlar.start.eksik} \n\`${yok.join(" | ")}\``));
                
                    if (yok.length == 0) {
                        data.system = "working";
                        await data.save();
                        ctx.send(ctx.embed().setDescription(ctx.language.komutlar.start.succes));
                    };
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}