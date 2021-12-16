import db from "../../../libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export default async function handler (req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    //mengambil username dan password
    const { username, password } = req.body

    //init checkUser
    const checkUser = await db('users').where({ 'username': username}).first();
    
    //check username
    if(!checkUser) return res.status(401).end();
    console.log([checkUser.username, checkUser.password]);

    //check password
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if(!checkPassword) return res.status(401).end();
    console.log(checkPassword);

    //give token if user and password correct
    const token =   jwt.sign({ id : checkUser.id, username: checkUser.username},
                    process.env.JWT_SIGNATURE, 
                    {expiresIn: '1 days'});

    res.status(200)
    res.json({
        message: "login berhasil",
        token
    })
};