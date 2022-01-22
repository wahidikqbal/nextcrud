import { useState } from "react";
import nookies from "next-cookies"
import Router from "next/router";
import { authPage } from "../middlewares/authPage";

export async function getServerSideProps(ctx) {
    
//     //REDIRECT LANGSUNG JIKA ADA COOKIE//
//     //console.log(await authPage(ctx))
    const allCookies = nookies(ctx)
    const token = allCookies.xToken
//     //console.log(token)



const postReq = await fetch('http://localhost:3000/api/posts', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
});

const posts = await postReq.json();
//console.log(posts)

return {
    props: {
        token,
        posts : posts.data
    }, // will be passed to the page component as props
}
}

export default function postCreate (props) {
    
    const [fields, setFields] = useState({
        title: '',
        content: '',
    })
    
    //status
    const [status, setStatus] = useState('Make your content here')
    
    async function createHandler(e) {
        e.preventDefault();
        console.log(fields)
        const { token } = props;
        //console.log(token)
        
        //status
        setStatus('loading')
        
            const create = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        })
        
        //status
        if(!create.ok) return setStatus('failed to post content')
        
        const res = await create.json();
        console.log(res)

        //status
        setStatus('Post created successfully')
        //Router push
        Router.push('/posts')
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        const value = e.target.value;
        //console.log(value, name)
        setFields({
            ...fields,
            [name]: value
        })
    }

    return (
        <div>
            <h1> Create a Post</h1>

            <form action="" onSubmit={createHandler.bind(this)}>
                <input onChange={fieldHandler.bind(this)} type="text" name="title" id="" placeholder="title" />
                <br />
                <textarea onChange={fieldHandler.bind(this)} name="content" id="" cols="30" rows="10" placeholder="Content"></textarea>
                <br />
                <button type="submit"> Create Post</button>
                <div> Status: {status}</div>
            </form>
        </div>
    )
}