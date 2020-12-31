const mongoose = require('mongoose');
const { config } = require('../config');

let mongoURI = '';

if (!config.envApp) {
    mongoURI = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
} else {
    mongoURI = `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
}

function connectionDB() {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    mongoose.connection.on('error', console.error.bind(console, "MongoDB Connection Error :"));

    mongoose.connection.once('open', () => {
        console.log('Connection Database Successfully!');
    });
}

module.exports = { connectionDB };