const jwt = require('jsonwebtoken');

var secret = process.env.JWT_SECRET;

const authorize = (req, res, next) =>{
    //all paths to be allowed by non authorized users
    //add more to the list as you see fit
    var pathAllowed = [
        '/',
        '/login',
        '/api/login',
        '/register',
        '/api/register'
    ]

    //check if the request url is inside the pathAllowed list
    for(let i = 0; i < pathAllowed.length; i++){
        if(req.url == pathAllowed[i]){
            return next();
        }
    }

    //check if the user is authorized via jwt
    const token = req.cookies['token'];
    jwt.verify(token, secret, (err, decoded)=>{
        if(err){
            //don't let the user through to the route
            return res.status(403).json({message: 'Forbidden'});
        }else{
            return next();
        }
    })
}

module.exports = authorize;