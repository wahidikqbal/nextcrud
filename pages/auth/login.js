import Cookies from "js-cookie";
import { useState } from "react/cjs/react.development";

export default function login () {

    //init field and setfield
    const [field, setfield] = useState({
        username: '',
        password: '',
    });

    //status message
    const [status, setstatus] = useState('Login dulu gan')

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

        console.log(loginRes);
        
        //set token in cookie
        Cookies.set('x-Token', loginRes.token);

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