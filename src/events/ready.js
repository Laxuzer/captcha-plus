const Event = require('../base/Event')

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'ready',
            enabled: true
        })
    }

    run() {
        const { Emoji } = this.client;

        Emoji.init(this.client);
        console.log(`Bağlandım. ${this.client.guilds.cache.size} sunucu, ${this.client.users.cache.size} kullanıcı`);
    }
}