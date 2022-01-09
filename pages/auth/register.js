import React, {useState} from "react";
import nookies from "next-cookies"
import { unauthPage } from "../middlewares/authPage";

export async function getServerSideProps(ctx) {
    
    //REDIRECT LANGSUNG JIKA ADA COOKIE//
    //console.log(await unPage(ctx))
    const allCookies = nookies(ctx)
    // console.log(allCookies)
    if(allCookies.xToken) 
        return await unauthPage(ctx)


    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default function Register () {

    //fields dan setfields, pakai "S"
    const [fields, setfields] = useState({ 
        username: "",
        email: "",
        password: "",
     });

    //status message
    const [status, setStatus] = useState('register dulu gan');
    
    //registerHandler
    async function registerHandler(e){
        e.preventDefault();
        
        //status message
        setStatus('loading')

        const registerReq = await fetch('/api/auth/register',{
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {'Content-Type': 'application/json'}
        });

        //status message
        if (!registerReq.ok) return setStatus('error', registerReq.status);

        const registerRes = await registerReq.json()

        //status message
        setStatus('Success')


    };

    function fieldHandler(e){
        const nilai = e.target.getAttribute('name');
        
        setfields({
            ...fields,
            [nilai]: e.target.value 
        })
    }

    return (
        <div>
            <h1> Register </h1>

            <form onSubmit={registerHandler.bind(this)}>
                <input onChangeCapture={fieldHandler.bind(this)} type="text" name="username" placeholder="Username"/>
                <br />
                <input onChangeCapture={fieldHandler.bind(this)} type="text" name="email" placeholder="Email" />
                <br />
                <input onChangeCapture={fieldHandler.bind(this)} type="password" name="password" placeholder="Password"/>
                <br />
                <button type="submit"> 
                    Register
                </button>

                {/* message status */}
                <div> Status: {status} </div>
            </form>
        </div>
    )
}