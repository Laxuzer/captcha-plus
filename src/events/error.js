const Event = require('../base/Event')

module.exports = class CError extends Event {
    constructor(client) {
        super(client, {
            name: 'error',
            enabled: true
        })
    }

    /**@param {Error} error */
    async run(error) {
        return this.client.ErrorHandler.error({ errorText: error.message, errorCode: error.name });
    }
}