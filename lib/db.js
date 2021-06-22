const knex = require('knex');
var db;

//database connection data stored in json
//create a .env file and add all the variables in there
var connection = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

const init = (options) =>{
    db = knex({
        client: 'pg',
        connection: connection
    });

    if(options.global){
        global.db = db;
    }

    return db;
}

module.exports = init;