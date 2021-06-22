const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

/*
* Route
* Name: /login
* Method: GET
* Description: display the login page, only for server side applications
* Parameters:
*/

router.get('/login', (req, res, next)=>{
    res.render('login');
})

/*
* Route
* Name: /api/login
* Method: POST
* Description: authenticate users logging in
* Parameters:
*/
router.post('/api/login', (req, res, next)=>{
    let username = req.body.username;
    //let email = req.body.email;

    let password = req.body.password;
    let findParams = {
        username,
        //email,
    }
    
    //find the username or email in the database
    global.db('user').select().where({findParams})
    .then((row)=>{
        //compare the encrypted password stored on the database with the password given.
        bcrypt.compare(password, rows[0].password, (err, result)=>{
            if(err){
                //render for server-side applications
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

                //store token in a cookie
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

/*
* Route
* Name: /register
* Method: GET
* Description: send the register page
* Parameters:
*/

router.get('/register', (req, res, next)=>{
    res.render('register');
});

/*
* Route
* Name: /api/register
* Method: POST
* Description: create new user
* Parameters:
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


/*
* Route
* Name: /api/logout
* Method: GET
* Description: deauthenticate users and log them out.
* Parameters:
*/

router.get('/api/logout', (req, res, next)=>{
    res.clearCookie('token');
    //TODO deauthenticate tokens
});
module.exports.router = router;