const Discord = require('discord.js');
const CaptchaPlus = require('./src/base/Client');
const client = new CaptchaPlus();
require('./src/handlers/handler')(client);

client.login(client.config.token)
    .then(() => client.logger.templates.Log('Discord', 'Bot Aktif!'))
    .catch((e) => client.ErrorHandler.error({ errorCode: 'ClientLogin', error: e.message }));