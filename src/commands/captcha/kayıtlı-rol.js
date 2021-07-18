const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class RegisterRol extends Command {
    constructor() {
        super({
            name: 'kayıtlı',
            aliases: ["kayıtlı-rol", "kayitli-rol", "verified-role", "verifiedrole"],
            permissions: {
                user: ['ADMINISTRATOR'],
                bot: ['MANAGE_ROLES']
            },
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    let lang = ctx.language.komutlar.register;
                    let rol = ctx.message.mentions.roles.first() || ctx.message.guild.roles.cache.get(ctx.input.args[0]);
                    if (!rol) return ctx.send(ctx.embed().setDescription(`${ctx.emoji('cross')} **${lang["arg"]}**`).setTitle(`${lang["invarg"]}`))
                    if (ctx.guild.roles.cache.get(rol.id).position > ctx.guild.me.roles.highest.position) return ctx.send(ctx.embed().setDescription(`${ctx.emoji('cross')} **${lang["yuksek"]}**`).setTitle(`${lang["error"]}!`))
                    if (rol) {
                        data.registered = rol.id;
                        data.save();
                        ctx.send(ctx.embed().setDescription(`${ctx.emoji('tick')} **${lang["suc"](rol.id)}**`).setTitle(`${lang["bas"]}!`))
                    }
                } catch (error) {
                    ctx.client.emit('error', error, ctx.guild);
                };
            }
        })
    }
}