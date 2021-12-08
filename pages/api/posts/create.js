import db from "../../../libs/db";

export default async function handler (req, res) {
	const create = await db('posts').insert({
		title 	: 'test Post title',
		content : "test post content",  
	})

	res.status (200);
	res.json ({
		message: "Post created successfully"
	});
}


