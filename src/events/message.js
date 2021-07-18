const { Message, Collection } = require('discord.js');
const Ctx = require('../base/Ctx');
const Event = require('../base/Event')
const cooldown = new Collection();

module.exports = class MessageEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'message',
            enabled: true
        })
    }
    /**
     * @param {Message} message 
     */
    async run(message) {
        // if (message.mentions.users.first() == this.client.user && message.content == `${this.client.user}`) {
        //     let datac = await global.dbget(message.guild.id).then(e => e.language);
        //     if (datac == 'tr') return message.channel.send(new Discord.MessageEmbed().setDescription(`\`${datac.prefix}yardım\` Yazarak komutlara bakabilirsin!`).setColor(renk.capt))
        //     if (datac == 'en') return message.channel.send(new Discord.MessageEmbed().setDescription(`To have a look at the commands you can use the \`${datac.prefix}help\` command!`).setColor(renk.capt))
        //     return;
        // }
        let prefix = [];
        this.client.config.prefix.forEach(e => prefix.push(e));
        let data = await global.dbget(message.guild.id);
        prefix.push(data.prefix);
        const UPrefix = prefix.find(p => message.content.startsWith(p)) || null;
        if (!UPrefix) return;
    
        let command,
        /**@type {import('../base/Command')} */
        cmd, 
        args, passed = [];
        if (message.content.slice(UPrefix.length).startsWith(' ')) {
            command = message.content.split(' ')[1];
            args = message.content.split(' ').slice(2);
        } else {
            command = message.content.split(' ')[0].slice(UPrefix.length);
            args = message.content.split(' ').slice(1);
        };
    
        if (this.client.CommandHandler.commands.has(command)) {
            cmd = this.client.CommandHandler.commands.get(command);
        } else if (this.client.CommandHandler.aliases.has(command)) {
            cmd = this.client.CommandHandler.commands.get(this.client.CommandHandler.aliases.get(command));
        } else return;

        if (cooldown.has(`${cmd.name}_${message.author.id}`)) {
            if (cooldown.get(`${cmd.name}_${message.author.id}_INFO_GIVEN`)) return;
            const finish = cooldown.get(`${cmd.name}_${message.author.id}`)
            const date = new Date();
            const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
            cooldown.set(`${cmd.name}_${message.author.id}_INFO_GIVEN`, true);
            return message.channel.send(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`);
        };

        const finish = new Date();
        finish.setSeconds(finish.getSeconds() + cmd.cooldown);
        if (cmd.cooldown > 0) {
            cooldown.set(`${cmd.name}_${message.author.id}`, finish);
            setTimeout(() => {
                cooldown.delete(`${cmd.name}_${message.author.id}_INFO_GIVEN`);
                cooldown.delete(`${cmd.name}_${message.author.id}`);
            }, cmd.cooldown * 1000);
        }
        const language = require('../dil')[data.language || 'en']

        if (cmd.permissions) {
            if (cmd.permissions.bot) {
                if (cmd.permissions.bot.some(a => !message.guild.me.hasPermission(a))) {
                    passed.push('botGuild');
                };
            };
    
            if (cmd.permissions.user) {
                if (cmd.permissions.user.find(a => !message.member.hasPermission(a))) {
                    passed.push('mGuild');
                };
            };
    
            if (cmd.permissions.modRole) {
                //
            };
    
            if (cmd.permissions.developerOnly) {
                if (!this.client.config.devs.includes(message.author.id)) {
                    passed.push('Dev')
                };
            };
            if (cmd.permissions.ownerOnly) {
                if (message.guild.owner.id !== message.author.id) {
                    passed.push('Owner')
                };
            };
            if (passed.length >= 1) {
                //bot veya memberin yetkisi yetmiyor! passed içinde m ile başlayanlar 'member',
                //bot ile başlayanlar 'bot' dur. ona göre sistem yapabilirsiniz.
            } else {
                try {
                    global.checkDB(message.guild.id);
                    runCmd(this.client);
                } catch (error) {
                    this.client.ErrorHandler.error({ errorCode: 'CmdRunError', error: error.message, params: [cmd.name]})
                }
            };
        } else {
            try {
                global.checkDB(message.guild.id);
                runCmd(this.client);
            } catch (error) {
                this.client.ErrorHandler.error({ errorCode: 'CmdRunError', error: error.message, params: [cmd.name]})
            }
        };

        function runCmd(client) {
            let Context = new Ctx(message, UPrefix, client, language);
            if (cmd.subCommands.length >= 1) {
                let CMD = cmd.subCommands.find(e => e.aliases.includes(`${Context.input.args[0]}`.toLowerCase()) || e.rawName == `${Context.input.args[0]}`.toLowerCase());
                if (CMD) {
                    CMD.run(Context);
                } else {
                    cmd.run(Context);
                }
            } else {
                cmd.run(Context);
            }
        }
    }
}