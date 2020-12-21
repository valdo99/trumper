import React,{useState} from 'react';
import { Card, Input, Spacer, Button } from '@geist-ui/react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const login = (username, password) => {
    axios.post("http://localhost:5000/users/login",{
        username:username,
        password:password
    }).then(res=>{
        alert(res.data);
    }).catch(err=>{
        alert(err);
    })

}


export const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");



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
                        <br />
                        <Spacer y={.5} />
                        <Button onClick={()=>login(username,password)}>Login</Button>
                        <Spacer y={.5} />
                        <Link to="register">
                            <Button>Register</Button>
                        </Link>
                    </center>
                </Card>
            </div>
        </>
    )
}