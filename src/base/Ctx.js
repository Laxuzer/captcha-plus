const { Message, TextChannel, User, Guild, GuildMember, MessageAttachment, MessageEmbed } = require("discord.js");
const Client = require('./Client');

class Input {
    constructor(message, prefix) {
        let args = message.content.split(' ').slice(1);

        /**
         * @type {String}
         */
        this.prefix = prefix

        /**
         * @type {Array<String>}
         */
        this.flags = message.content.includes('--') ? args.filter(e => e.startsWith('--')).map(e => e.slice(2)): []
        
        /**
         * @type {Array<String>}
         */
        this.args = args.filter(e => !e.startsWith('--'))

        /**
         * @type {Array<String>}
         */
        this.fullArgs = args

        /**
         * @type {String}
         */
        this.content = message.content
        
        /**
         * @type {String}
         */
        this.cleanContent = message.content.clean(true)
    }
}


class Context {
    /**
     * @param {import('discord.js').Message} message
     * @param {String} prefix
     * @param {import('./Client')} client
     * @param {import('../dil')['en']} language
     */
    constructor(message, prefix, client, language) {
        /**
         * @type {Client}
         * @returns {Client}
         */
        this.client = client;

        /**
         * @type {Message}
         */
        this.message = message;

        /**
         * @type {TextChannel}
         */
        this.channel = message.channel || null;

        /**
         * @type {Guild}
         */
        this.guild = message.guild || null;

        /**
         * @type {GuildMember}
         */
        this.me = message.guild.me || null;

        /**
         * @type {User}
         */
        this.author = message.author || null;

        /**
         * @type {GuildMember}
         */
        this.member = message.member || null;

        /**
         * @type {import('../dil')['en'|'tr']}
         */
        this.language = language;

        /**
         * @type {import('../renk.json')}
         */
        this.renk = require('../renk.json');

        let In = new Input(message, prefix);
        /**
         * @returns {Input}
         */
        this.input = In;
    };

    /**
     * @param {String} emoji_name
     * @returns {String} 
    */
    emoji(emoji_name) {
        return this.client.Emoji.get(emoji_name);
    }

    /**@returns {MessageEmbed} */
    embed() {
        return new MessageEmbed().setColor(require('../renk').capt).setAuthor(this.author.tag, this.author.displayAvatarURL({ dynamic: true }))
    }

    /**
     * @name sendMessage
     * @returns {Message}
     */
    send(...args) {
        return this.channel.send(...args);
    };
};

module.exports = Context;