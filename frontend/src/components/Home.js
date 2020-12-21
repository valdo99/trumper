import React from 'react';
import {Link} from 'react-router-dom';
import { Card,Button,Spacer } from '@geist-ui/react'

export const Home = () => {
    return (
        <div className="container">
            <Card shadow>
                <center>
                <h4>To-do app Twitch</h4>
                <Link to="/login" >
                    <Button shadow type="secondary">Login</Button><br></br>
                </Link>
                <Spacer y={0.5} />
                <Button shadow type="secondary">Sign-Up</Button>
                </center>
            </Card>
        </div>
    )
}