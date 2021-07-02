const knex = require('knex');
var db;

/**
 * Function
 * Description: connect the user to the database using the knex library,
 *              make sure the environment variables are setup, either by using
 *              the provided .sample_env file to create a local .env file or
 *              checking that the environment variables are setup on the servers
 * Parameters: 
 * @param options allow the database to be returned as a global or local variable
 * @return the resultant db connection object.
 */
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