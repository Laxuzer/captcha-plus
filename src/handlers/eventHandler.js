const { readdirSync } = require('fs');

/**@param {import('../base/Client')} client */
module.exports = async function(client) {
    const events = await readdirSync('./src/events');
    client.logger.templates.Log('EventHandler', `Loading a total of ${events.length} events.`, { TitleColor: 'green' });
    for (const event of events) {
        const Event = require(`../events/${event}`);
        const e = new Event(client);
        if (!e.enabled) return;
        client.on(e.name, async (...args) => await e.run(...args, client));
        client.logger.templates.Log('EventHandler', `Loading Event: ${e.name}. 👌`, { TitleColor: 'green' });
        delete require.cache[require.resolve(`../events/${event}`)];
    }
};