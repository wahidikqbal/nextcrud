import db from "../../../libs/db"

export default async function handler (req, res) {
    if(req.method !== 'GET') return res.status(405).end();

const allData = await db('posts');

    res.status(200)
    res.json({
        message: 'halaman index',
        data: allData
    })
};