import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import { unauthPage } from "../../pages/middlewares/authPage"
import nookies from "next-cookies"

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

export default function Login () {

    //init field and setfield
    const [field, setfield] = useState({
        username: '',
        password: '',
    });

    //status message
    const [status, setstatus] = useState('Login dulu gan')

    //push ke halaman post jika ada token
    // useEffect( () => {
    //     const token = Cookies.get('xToken');

    //     if(token) return Router.push('/posts')
    // }, []);
    
    //function loginHandler
    async function loginHandler(e){
        e.preventDefault();

        //status message
        setstatus('loading')

        //init registerReq
        const loginReq = await fetch('/api/auth/login', {
                            method: 'POST',
                            body: JSON.stringify(field),   
                            headers: {'Content-Type': 'application/json'}
        });

        if(!loginReq.ok) return setstatus('Login gagal', loginReq.status)

        const loginRes = await loginReq.json()

        //console.log(loginRes);
        
        //set token in cookie
        Cookies.set('xToken', loginRes.token);

        //push ke halaman posts
        Router.push('/posts')

        //status message
        setstatus('Login Success')
    }

    //function fieldHandler
    function fieldHandler (e) {
        const nilai = e.target.getAttribute('name')

        setfield({
            ...field,
            [nilai]: e.target.value
        })
    }

    return (
        <div className="login">
            <h1> Login </h1>

            <form onSubmit={loginHandler.bind(this)} action="">
            <input onChange={fieldHandler.bind(this)} type="text" name="username" placeholder="Username"/>
            <br />
            <input onChange={fieldHandler.bind(this)} type="password" name="password" placeholder="Password"/>
            <br />
            <button type="submit">Login</button>
            <div> Status : {status} </div>
            </form>
        </div>
        
    )
};