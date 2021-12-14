import jwt from "jsonwebtoken";
import dotenv from "dotenv";

async function verify (req, res) {
    // console.log(req.headers)
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).end();
    
    const authSplit = authorization.split(' ');
    const [authType, authToken] =  [
        authSplit[0],
        authSplit[1]
    ]
    console.log(authSplit);
    if(authType !== 'Bearer') return res.status(401).end();
    try {
        const verifyToken = jwt.verify(authToken, process.env.JWT_SIGNATURE)
    } catch (error) {
        return res.status(401).end();        
    }
};

module.exports.verify = verify;
