const Discord = require('discord.js');
const Command = require('../../base/Command');

module.exports = class Help extends Command {
    constructor() {
        super({
            name: "yardım",
            aliases: ["help", "y", "h"],
            run: async (ctx) => {
                try {
                    let data = await global.dbget(ctx.guild.id);
                    if (data.language == "tr") {
                        ctx.send(
                            new Discord.MessageEmbed()
                            .addField(`__**Dil**__`, `\`${data.prefix}dil [EN/TR]\` \n> Botun dilini değiştirmek için kullanabilirsin.`, true)
                            .addField(`__**Prefix**__`, `\`${data.prefix}prefix [prefix/reset]\` \n> Botun prefixini değiştirmek için kullanabilirsin.`, true)
                            .addField(`__**Başlat**__`, `\`${data.prefix}başlat\` \n> Sistemi başlatmak için kullanabilirsin.` , true)
                            .addField(`__**Durdur**__`, `\`${data.prefix}durdur\` \n> Sistemi durdurmak için kullanabilirsin. **__Tüm verilerini sıfırlar!__**` , true)
                            .addField(`__**Doğrulanmış Rol**__`, `\`${data.prefix}kayıtlı [@Rol]\` \n> Doğrulanmış rolünü ayarlamak için kullanabilirsin.`, true)
                            .addField(`__**Doğrulanmamış Rol**__`, `\`${data.prefix}kayıtsız [@Rol]\` \n> Doğrulanmamış rolünü ayarlamak için kullanabilirsin.`, true)
                            .addField(`__**Doğrulama Kanalı**__`, `\`${data.prefix}doğrulama-kanalı\` \n> Doğrulama kanalını ayarlamak için kullanabilirsin.`, true)
                            .addField(`__**Captcha Log**__`, `\`${data.prefix}log [#Kanal]\` \n> Captcha logunu ayarlamak için kullanabilirsin.`, true)
                            .setColor(ctx.renk.capt)
                        )
                    }
                    if (data.language == "en") {
                        ctx.send(
                        new Discord.MessageEmbed()
                            .addField(`__**Language**__`, `\`${data.prefix}lang [EN/TR]\` \n> Use it for changing the bot’s language.`, true)
                            .addField(`__**Prefix**__`, `\`${data.prefix}prefix [prefix/reset]\` \n> Use it for changing the bot’s prefix.`, true)
                            .addField(`__**Start**__`, `\`${data.prefix}start\` \n> Use it for starting the system.` , true)
                            .addField(`__**Stop**__`, `\`${data.prefix}stop\` \n> Use it for stopping the system and __delete all data!__` , true)
                            .addField(`__**Verified Role**__`, `\`${data.prefix}verified [@Role]\` \n> Use it for set verified role.`, true)
                            .addField(`__**UnVerified Role**__`, `\`${data.prefix}unverified [@Role]\` \n> Use it for set unverified role.`, true)
                            .addField(`__**Verify Channel**__`, `\`${data.prefix}verify-channel [#Channel]\` \n> Use it for set verify channel.`, true)
                            .addField(`__**Captcha Log**__`, `\`${data.prefix}log [#Channel]\` \n> Use it for set captcha log.`, true)
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