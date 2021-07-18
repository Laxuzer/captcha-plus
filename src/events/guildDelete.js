const Event = require('../base/Event')

module.exports = class GuildDelete extends Event {
    constructor(client) {
        super(client, {
            name: 'guildDelete',
            enabled: true
        })
    }

    /**@param {import('discord.js').Guild} guild */
    async run(guild) {
        global.mongo.findOneAndDelete({ guildID: guild.id });
    }
}