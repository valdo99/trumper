var User = require('../models/User');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

/*
    POST api/users/login -> si fara il controllo del login
    POST api/users/register -> si crea un utente nuovo, con controlli su email e campi unique
    GET api/users/user/:id -> per fare il fetch delle informazioni dell'utente
    GET api/users/emailverification -> verificare la mail delll'utente con un link di accesso
    POST api/users/editProfile -> Modificare il profio dell'utente -> NO EMAIL e createdAt
*/

router.post("/register", (req, res) => {
    // 1)- bisogna controllare se esiste o no un utente con la stessa email oppure username
    User.find({ email: req.body.email }).then(doc => {
        if (doc.length > 0) {
            res.status(402).send({ message: "email already in use" });
        } else {
            User.find({ username: req.body.username }).then(doc1 => {
                if (doc1.length > 0) {
                    res.status(402).send({ message: "username already in use!" });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, pwd) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send({ message: err });
                        } else {
                            var user = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: pwd
                            });
                            user.save().then(newUser => {
                                // INVIARE MAIL ALL'UTENTE PER VERIFICARE IL PROPRIO ACCOUNT
                                res.status(200).send({ user: newUser })
                            }).catch(err => {
                                res.status(500).send({ message: err });
                            })
                        }

                    })
                }

            }).catch(err => {
                res.status(500).send({ message: err });
            })
        }

    }).catch(err => {
        res.status(500).send({ message: err });
    })
})

router.get("/user/:username",(req,res)=>{
    User.findOne({ username: req.params.username}, (err,doc)=>{
        if (err){
            res.status(500).json({ message: "Error has occured"});
        }else if(!doc){
            res.status(404).send({message:"User not found"});
        } else {
            const { username,  email, createdAt} =  doc
            res.status(200).json({user: {username, email, createdAt}})
        }
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    User.findOne({ username }, (err, user) => {
        if(err) 
            return res.status(500).json({ message: "Error has occured"})

        // console.log(user)
        if(!user)
            return res.status(404).json({ message: "user not found"})

        bcrypt.compare(password, user.password, (err, success) => {
            if(err)
                return res.status(500).json({ message: "Error has occured"})
            
            if(!success)
                return res.status(401).json({ message: "Wrong password"})

            const { username, id } = user

            const token = jwt.sign({ username, id}, process.env.JWT_SIGN_TOKEN)
            // jwt ?? JWT_SIGN_TOKEN
            return res.status(200).json({ token: token})
        })
    })
})

module.exports = router;