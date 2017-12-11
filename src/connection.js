const Query = require('./query');

const Connection = {
    defaultCredentials: {
        username: 'guest',
        password: 'guest'
    },

    Connection({ uri, credentials }) {
        this.uri = uri;
        this.credentials = Object.assign({}, this.defaultCredentials, credentials);
    },
    query(xquery, options = {}, properties = {}) {
        const q = Object.create(Query);

        q.Query({
            connection: this,
            xquery,
            options,
            properties
        });

        return q.execute();
    }
};

module.exports = Connection;
