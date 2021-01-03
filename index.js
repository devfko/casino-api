require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const expressPlayGround = require('graphql-playground-middleware-express').default;
const { config } = require('./config');
const schema = require('./schema');

const { normalizePort } = require('./utils/normalize');

const mongoConnection = require('./db');
const { ApolloServer } = require('apollo-server-express');
mongoConnection.connectionDB();

const server = new ApolloServer({
    schema,
    // introspection: true,
    // playground: true,
    formatError: (err) => ({
        message: err.message,
        code: err.extensions.code,
        stack: (process.env.NODE_ENV === 'production') ? 'PRODUCTION' : err.extensions.exception.stacktrace
    })
});

const app = express();
// app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(express.json());

app.use('*', cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, resp) {
    return resp.status(200).json({
        message: 'API GraphQL',
        author: '@devfko <proyectosevfko@gmailcom>',
        url_main: `${config.appURL}` + (process.env.NODE_ENV !== 'production' ? ':' + config.appPort : '') + `/graphql`
    });
});

server.applyMiddleware({ app });
app.get('/', expressPlayGround({
    endpoint: '/graphql'
}));

var port = normalizePort(process.env.PORT || process.env.URL_PORT);
app.set('port', port);
const httpServer = http.createServer(app);

httpServer.listen(port, () => {

    console.log(`Deployed Server in ${config.appURL}` + (config.appPort ? ':' + config.appPort + '/' : ''));

});