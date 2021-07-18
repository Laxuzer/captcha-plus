/**@param {import('../base/Client')} client */
module.exports = function(client) {
    require('./commandHandler')(client);
    require('./mongoHandler')(client);
    require('./functionHandler')(client);
    require('./eventHandler')(client);
};