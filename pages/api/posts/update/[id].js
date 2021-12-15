import db from "../../../../libs/db"
import authorization from "../../middlewares/authorization";

export default async function handler (req, res) {

    if(req.method !== 'PUT') return res.status(405).end();

    //middleware
	const middleAuth = await authorization(req, res);

    const { id } = req.query;

    const { title, content} = req.body 

    const update = await db('posts').where({'id': id}).update({title, content});

    const dataUpdated = await db('posts').where('id', update).first();

    res.status(200)
    res.json({
        message: "post updated successfully",
        data: dataUpdated
    })
};