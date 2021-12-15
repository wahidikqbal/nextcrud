import React, {useState} from "react";


export default function Register () {

    //fields dan setfields, pakai "S"
    const [fields, setfields] = useState({ 
        username: "",
        email: "",
        password: "",
     });
    
    //registerHandler
    async function registerHandler(e){
        e.preventDefault();
        
        const registerReq = await fetch('/api/auth/register',{
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {'Content-Type': 'application/json'}
        });

        const registerRes = await registerReq.json()

        console.log(registerRes);


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
                <button type="submit"> 
                    Register 
                </button>
            </form>
        </div>
    )
}