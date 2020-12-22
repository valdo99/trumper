var Quote = require('../models/Quote');
var User = require('../models/User')
var express = require('express');
var router = express.Router();


router.post("/left", (req, res) => {
    try {
        const { quote_id, quote_text,userId } = req.body;
        //find quote by quote_id
        Quote.findOne({ quote_id: quote_id }, (err, doc) => {
            if (err) {
                res.status(500).send({ err: err });
            }
            if (!doc) {
                //doc not exists
                var quote = new Quote({
                    quote_id: quote_id,
                    quote_text: quote_text,
                    dislikes: 1
                });
                quote.save().then(ok => {
                    User.findById(userId,(err,user)=>{
                        if (err) res.status(500);
                        user.setNext("leftSwipes",(err,s)=>{
                            if (err) res.status(500);
                            res.status(200);
                        })
                    })
                }).catch(err => {
                    res.status(500)
                });

            } else {
                doc.setNext("dislikes", (err, q) => {
                    if (err) res.status(500);
                    User.findById(userId,(err,user)=>{
                        if (err) res.status(500);
                        user.setNext("leftSwipes",(err,s)=>{
                            if (err) res.status(500);
                            res.status(200);
                        })
                    })
                })
            }
        })
    } catch {
        res.status(500).send("error undefined")
    }
})

router.post("/right", (req, res) => {
    try {
        const { quote_id, quote_text,userId } = req.body;
        //find quote by quote_id
        Quote.findOne({ quote_id: quote_id }, (err, doc) => {
            if (err) {
                res.status(500).send({ err: err });
            }
            if (!doc) {
                //doc not exists
                var quote = new Quote({
                    quote_id: quote_id,
                    quote_text: quote_text,
                    likes: 1
                });
                quote.save().then(ok => {
                    User.findById(userId,(err,user)=>{
                        if (err) res.status(500);
                        user.setNext("rightSwipes",(err,s)=>{
                            if (err) res.status(500);
                            res.status(200);
                        })
                    })
                }).catch(err => {
                    res.status(500)
                });

            } else {
                doc.setNext("likes", (err, q) => {
                    if (err) res.status(500);
                    User.findById(userId,(err,user)=>{
                        if (err) res.status(500);
                        user.setNext("rightSwipes",(err,s)=>{
                            if (err) res.status(500);
                            res.status(200);
                        })
                    })
                })
            }
        })
    } catch {
        res.status(500).send("error undefined")
    }
})


module.exports = router;