/**@param {import('../base/Client')} client */
module.exports = (client) => {
    const mongoose = require('mongoose');
    global.mongo = require('../mongo/schema');

    mongoose.connect(client.config.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    global.checkDB = function(id) {
        return require('../mongo/functions').create(id)
    }

    global.dbget = async function(id) {
        let data = await global.mongo.findOne({ guildID: id }).then(v => v);
        return data;
    };

    global.dbdelete = async function(id, veri) {
        let data = await global.dbget(id);
        if (data) {
            data[veri] = null;
            data.save(); 
            return true;
        } else return false;
    };
}