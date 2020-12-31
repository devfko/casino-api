require('dotenv').config();

const config = {
    envApp: process.env.NODE_ENV === 'production',
    appPort: process.env.URL_PORT,
    appURL: process.env.URL_DOMAIN,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME
};

module.exports = { config };