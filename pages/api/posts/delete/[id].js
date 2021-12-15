import db from "../../../../libs/db"
import authorization from "../../middlewares/authorization";

export default async function handler (req, res) {
    
    if(req.method !== 'DELETE') return res.status(405).end();

    //middleware
	const middleAuth = await authorization(req, res);

    const { id } = req.query;

    const deletePost = await db('posts').where({'id': id}).del();

    res.status(200)
    res.json({
        messagge: 'Post Deleted',
        data: deletePost
    });
};