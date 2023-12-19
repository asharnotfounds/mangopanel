const mysql2 = require('mysql2/promise');
const config = require(`../config.json`);
const bluebird = require('bluebird');

async function dbConnection() {
    return await mysql2.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        Promise : bluebird
    });
}



module.exports.dbConnection = dbConnection