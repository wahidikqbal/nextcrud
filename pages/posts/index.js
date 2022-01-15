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
    console.log(posts)

    return {
      props: {
          posts : posts.data
      }, // will be passed to the page component as props
    }
  }

export default function postIndex (props) {
    return (
        <div>
            <h1> Halaman Posts</h1>
            { props.posts.map(post => {
                return (
                    <div key={post.id}> 
                        {post.title} , {post.content} 
                    </div>
                )
            }) }
        </div>
    )
}