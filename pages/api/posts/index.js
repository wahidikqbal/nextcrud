import db from "../../../libs/db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import authorization from "../middlewares/authorization"

export default async function handler (req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    // middleware
    const middleAuth = await authorization(req, res);

    const allData = await db('posts');
    
    res.status(200)
    res.json({
    message: 'halaman index',
    data: allData
    });
};