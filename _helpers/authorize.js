/**
 * File name: authorize.js
 * Version: 0.0.1
 * Author: JatinVC
 */
const jwt = require('jsonwebtoken');

var secret = process.env.JWT_SECRET;

/**
* Middleware function
* Description: Check if the user is allowed to access the url they've sent a request to,
*              pathAllowed array stores paths that all users are able to access, any other
*              path, the user needs to be authenticated by checking their token.
*/

const authorize = (req, res, next) =>{
    //all paths to be allowed by all users
    //adjust the list as you see fit.
    var pathAllowed = [
        '/',
        '/login',
        '/api/login',
        '/register',
        '/api/register'
    ]

    for(let i = 0; i < pathAllowed.length; i++){
        if(req.url == pathAllowed[i]){
            return next();
        }
    }

    const token = req.cookies['token'];
    jwt.verify(token, secret, (err, decoded)=>{
        if(err){
            return res.status(403).json({message: 'Forbidden route'});
        }else{
            return next();
        }
    })
}

module.exports = authorize;