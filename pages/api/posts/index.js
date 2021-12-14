import db from "../../../libs/db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export default async function handler (req, res) {
    if(req.method !== 'GET') return res.status(405).end();

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
        const verify = jwt.verify(authToken, process.env.JWT_SIGNATURE)

        const allData = await db('posts');
        
        res.status(200)
        res.json({
        message: 'halaman index',
        data: allData
        });
        
    } catch (error) {
        res.status(401).end();
    }
};