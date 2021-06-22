module.exports = {
    apps: [{
        name: 'application-name',
        script: '/var/www/app-name/back-end/app.js',
        output: './out.log',
        error: './error.log',
        log: './combined.outerr.log',
        env_production: {
            NODE_ENV: 'production'
        },
        env_test:{
            NODE_ENV: 'test'
        },
        env_development:{
            NODE_ENV: 'production',
            PORT: '3001',
            ENV_VAR: '/location/to/envvars/file'
        }
    }]
}