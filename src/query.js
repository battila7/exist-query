const Query = {
    deps: {
        fetch
    },
    defaultOptions: {
        start: 1,
        max: 1024,
        cache: false,
        sessionId: ''
    },

    Query({ connection, xquery, options, properties }) {
        this.connection = connection;
        this.xquery = xquery;
        this.options = Object.assign({}, this.defaultOptions, options);
        this.properties = properties;
    },
    execute() {
        return this.deps.fetch(this.uri(), {
            method: 'post',
            body: this.body(),
            headers: this.headers()
        });
    },
    uri() {
        return `${this.connection.uri}/rest/db`;
    },
    headers() {
        return {
            'Authorization': `Basic ${this.authorizationCredentials()}`,
            'Content-Type': 'application/xml'
        };
    },
    authorizationCredentials() {
        return btoa(`${this.connection.credentials.username}:${this.connection.credentials.password}`);
    },
    body() {
        const shouldCache = this.options.cache ? 'yes' : 'no';

        return `
        <query xmlns="http://exist.sourceforge.net/NS/exist"
            start="${this.options.start}" 
            max="${this.options.max}"
            cache="${shouldCache}"
            session-id="${this.options.sessionId}">
            <text><![CDATA[${this.xquery}]]></text>
            <properties>
                ${this.propertiesXml()}
            </properties>
        </query>
        `;
    },
    propertiesXml() {
        return Object.keys(this.properties)
                      .map(key => `<property name="${key}" value="${this.properties[key]} />"`)
                      .join('');
    }
};

module.exports = Query;
