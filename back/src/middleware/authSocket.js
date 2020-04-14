const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtSecret');

export async function authSocket(token){
    if(!token){
        return { error: 'No token, authorization denied' };
    }
    try{
        const decoded = jwt.verify(token, jwtSecret.jwtSecret);
        return {userid: decoded.userid};

    }catch(err){
        return {error: 'Token is not valid'};
    }
}