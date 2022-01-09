import { authPage } from "../middlewares/authPage"
import nookies from "next-cookies"

export async function getServerSideProps(ctx) {
    
    //REDIRECT LANGSUNG JIKA ADA COOKIE//
    //console.log(await authPage(ctx))
    const allCookies = nookies(ctx)
    // console.log(allCookies)
    if(!allCookies.xToken) 
        return await authPage(ctx)


    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default function postIndex () {
    return (
        <div>
            <h1> Halaman Posts</h1>
        </div>
    )
}