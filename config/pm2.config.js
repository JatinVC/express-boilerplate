/**
 * File name: pm2.config.js
 * Author: JatinVC
 * Description: config file for PM2 process manager on linux
 *              holds the location to the back-end application
 *              and options to allow pm2 to run the app in linux
 */

module.exports = {
    apps: [{
        name: 'application-name',
        script: '/var/www/app-name/back-end/app.js',
        output: './out.log',
        error: './error.log',
        log: './combined.outerr.log',
        env_production: {
            NODE_ENV: 'production',
            PORT: '3001',
            ENV_VAR: '/location/to/envvars/file'
        },
        env_test:{
            NODE_ENV: 'test',
            PORT: '3001',
            ENV_VAR: '/location/to/envvars/file'
        },
        env_development:{
            NODE_ENV: 'production',
            PORT: '3001',
            ENV_VAR: '/location/to/envvars/file'
        }
    }]
}