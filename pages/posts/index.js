import { authPage} from "../middlewares/authPage"
import nookies from "next-cookies"

export async function getServerSideProps(ctx) {
    
//     //REDIRECT LANGSUNG JIKA ADA COOKIE//
//     //console.log(await authPage(ctx))
    const allCookies = nookies(ctx)
    const token = allCookies.xToken
//     //console.log(token)

    if(!token) 
        return await authPage(ctx)

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

export default function postIndex (props) {
    
    async function deleteHandler(id, e) {
        
        e.preventDefault();
        
        const{token} = props;
        //console.log(token)

        const ask = confirm('Apakah data ini akan dihapus?')

        if(ask) {
            const deletePost = await fetch('http://localhost:3000/api/posts/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const res = await deletePost.json()
            console.log(res)
        }
    }
    
    async function editHandler(id, e){
        e.preventDefault()
    }
    

    return (
        <div>
            <h1> Halaman Posts</h1>

            {props.posts.map(post => (
                <div key={post.id}>
                    <h3> {post.title} </h3>
                    <p> {post.content} </p>

                    <div>
                        <button onClick={editHandler.bind(this)}>Edit</button>
                        <button onClick={deleteHandler.bind(this,post.id)}>Delete</button>
                    </div>
                </div>
                )
            )}
   
            <h4> <a href="/posts/create">Create post</a></h4>
        </div>
    )
}