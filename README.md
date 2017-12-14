# exist-query

Browser-friendly eXist-db XQuery executor. Well, to be honest, it's actually browser-first, because of the dependency on the Fetch API and the `btoa()` function. However, these dependencies will be sorted out soon.

## Usage

Using exist-query is pretty simple. First obtain a connection:

~~~~JavaScript
const connectionOptions = {
    uri: 'localhost:8080/exist',
    credentials: {
        username: 'admin',
        password: 'admin
    }
};

const connection = require('exist-query')(connectionOptions);
~~~~

Then you can issue queries through this connection:

~~~~JavaScript
connection.query('insert XQuery here', {
    start: 1,
    max: 1024,
    cache: false,
    sessionId: ''
}, {
    additional: 'properties',
    see: 'exist documentation'
}).then(response => console.log(response));
~~~~
