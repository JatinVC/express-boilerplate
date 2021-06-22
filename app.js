require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

//calling the database setup function
db = require('./lib/db')({global: true});

//devops setup
global.config = require('./config/server.json');

//allowing requests CORS (Cross origin resource sharing)
app.use(function(req, res, next) {
    app.options('*', cors());
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//setting the port for the application as well as some middlewares
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

//import the routes here
const auth = require('./routes/auth');
//mount the routes here
app.use('/', auth.router);


//export the application
module.exports = app;