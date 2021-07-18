const mongo = global.mongo;

class Mongo {
    static async create(guild) {
        let data = await mongo.findOne({ guildID: guild });
        if (data) {
            return true;
        } else {
            let newData = new mongo({
                guildID: guild,
                registered: null,
                unregistered: null,
                log: null,
                verify_channel: null,
                system: null,
                prefix: "-",
                language: "en",
            });
            await newData.save();
            return true;
        };
    };
    static async Reset(guild) {
        let data = await mongo.findOne({ guildID: guild });
        if (!data) {
            return false;
        } else {
            data.registered = null;
            data.unregistered = null;
            data.log = null;
            data.verify_channel = null;
            data.system = null;
            await data.save();
            return true;
        };
    };
};

global.mfunc = Mongo;
module.exports = Mongo;