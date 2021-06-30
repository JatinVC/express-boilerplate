require('dotenv').config();
const express = require('express');
var app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const authorize = require('./_helpers/authorize');

//calling the database setup function
db = require('./lib/db')({global: true});

var server = http.createServer(app);
server.listen(process.env.PORT || 3001); 

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
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(authorize);

//import the routes here
const auth = require('./routes/auth');
//mount the routes here
app.use('/', auth.router);


//export the application
module.exports = app;