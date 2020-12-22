import React,{useState} from 'react';
import { Card, Input, Spacer, Button } from '@geist-ui/react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie' 

const login = (username, password, email) => {
    axios.post("http://localhost:5000/users/register", {
        username:username,
        password:password,
        email: email
    }).then(res => {
        Cookies.set('jwt', res.data.token)
        Cookies.set('id',res.data.id)
        window.location = '/feed'
    }).catch(err => {
        alert(err);
    })

}


export const Register = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    return (
        <>
            <div className="container">
                <Card shadow>
                    <center>
                        <h4>Login</h4>
                        <Input label="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <Spacer y={.5} />
                        {/* rednere dinamico type = password per visualizzare la password inserita */}
                        <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <Spacer y={.5} />
                        <Input label="Email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <br />
                        <Spacer y={.5} />
                        <Button onClick={()=>login(username,password, email)}>Register</Button>
                        <Spacer y={.5} />
                        <Link to="login">
                            <Button>login</Button>
                        </Link>
                    </center>
                </Card>
            </div>
        </>
    )
}