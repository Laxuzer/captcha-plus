const Event = require('../base/Event')

module.exports = class GuildCreate extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate',
            enabled: true
        })
    }

    /**@param {import('discord.js').Guild} guild */
    async run(guild) {
        try {
            if (!guild || !guild.owner) return;
            var chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
            chx.send(new Discord.MessageEmbed()
            .setTitle(`Hello, I am ${client.user.username}`)
            .setDescription(`:flag_us: __**English**__
            > <a:hi:780880000794624011> Hello, my name is <@!${client.user.id}>, I am here to __verify__ users when they come into your server. 
            > Use \`-lang [EN / TR]\` command to set the language for the server.
            > You can use \`-prefix\` to set the prefix for this server.
            > To have a look at the commands you can use the \`-help\` command!
    
            :flag_tr: __**Turkish**__
            > <a:hi:780880000794624011> Merhaba, ben <@!${client.user.id}>, sunucunuzdaki kullanıcıları __doğrulamak__ için buradayım. 
            > Botun dilini ayarlamak için \`-dil [TR / EN]\` kullanabilirsin.
            > Botun prefixini ayarlamak için \`-prefix\` kullanabilirsin.
            > \`-yardım\` Yazarak komutlara bakabilirsin!`)
            .setFooter(`Made by ${laxuzer} and ${taha}`).setColor("#2c63b0"))
        } catch (error) {
            client.emit('error', error, guild);
        };
    }
}