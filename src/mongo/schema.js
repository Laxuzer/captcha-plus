const mongoose = require('mongoose');

const database = new mongoose.Schema({
    guildID: String,
    registered: String,
    unregistered: String,
    log: String,
    verify_channel: String,
    prefix: String,
    language: String,
    system: String
});

const MessageModel = (module.exports = mongoose.model("data", database));