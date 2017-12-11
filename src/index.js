const Connection = require('./connection');

module.exports = function connection(options) {
    const connection = Object.create(Connection);
    
    connection.Connection(options);

    return connection;
};
