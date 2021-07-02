/**
* File Name: AUTH.JS 
* Version: 0.0.1
* Author: JatinVC
* Description: All routes in this file handle authentication of users, 
*              for both full-stack applications and server-side applications.
*/
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

/**
* Route
* Name: /login
* Method: GET
* Description: send the login page to the client, only for server side applications
* Parameters:
*/

router.get('/login', (req, res, next)=>{
    res.render('login');
})

/**
* Route
* Name: /api/login
* Method: POST
* Description: authenticate users logging in, 
*              compare the stored hashed password with the password that was 
*              given by the user to authenticate the user. Then generate a JWT
*              token with the username and store in a cookie.
*/
router.post('/api/login', (req, res, next)=>{
    let username = req.body.username;
    //let email = req.body.email;

    let password = req.body.password;
    let findParams = {
        username,
        //email,
    }
    
    global.db('user').select().where({findParams})
    .then((row)=>{
        bcrypt.compare(password, rows[0].password, (err, result)=>{
            if(err){
                res.status(401).json({message: 'User authentication failed'});
                // res.render('/login', {message: 'login failed, please try again'});
            }else{
                var user = {
                    username,
                    //email,
                };

                var token = jwt.sign(user, jwtSecret, {
                    algorithm: 'HS256',
                    expiresIn: 60*60*24
                });

                res.cookie('token', token, {maxAge: 60*60*24*1000, httpOnly: true});
                res.json({
                    message: 'User Authenticated',
                    token: token
                });
                // res.redirect('/');
            }
        })
    })
    .catch((err)=>{
        res.status(401).json({
            message: 'User Authentication Failed'
        });
        res.render('/login', {message: 'user not found, please try again'});
    });
});

/**
* Route
* Name: /register
* Method: GET
* Description: send the register page to the client
* Parameters:
*/

router.get('/register', (req, res, next)=>{
    res.render('register');
});

/**
* Route
* Name: /api/register
* Method: POST
* Description: create a new user, encrypt the password using bcrypt 
*              and store the username and the encrypted password in the database.
*/

router.post('/api/register', (req, res, next)=>{
    var username = req.body.username;
    //var email = req.body.email;

    var plainPassword = req.body.password;
    //add more variables as you see fit.

    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(plainPassword, salt, (err, hash)=>{
            let data = {
                username,
                //email,
                password: hash
            };

            global.db('user').insert(data, 'user_id')
            .then((rows)=>{
                res.json({message: 'created user successfully'});
                // res.redirect('/login');
            })
            .catch((err)=>{
                res.json({message: 'error occured while creating user'})
                // res.redirect('/register');
            });
        });
    });
});


/**
* Route
* Name: /api/logout
* Method: GET
* Description: deauthenticate users and log them out.
*/
//TODO somehow also need to track tokens that are deauthenticated, and reject any request from them

router.get('/api/logout', (req, res, next)=>{
    res.clearCookie('token');
});
module.exports.router = router;