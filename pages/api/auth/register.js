import db from "../../../libs/db"
import bcrypt from "bcryptjs"

export default async function (req, res) {

    if(req.method !== 'POST') return res.status(405).end()

    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password, salt)
    
    console.log({username, email, passwordHash});
    
    const register = await db('users').insert({username, email, 'password': passwordHash});

    const userRegistered = await db('users').where({id : register}).first();

    res.status(200)
    res.json({
        message: "register successfully",
        data: userRegistered
    })
}