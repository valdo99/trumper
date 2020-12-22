const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./api/users');
const quotes = require('./api/quotes')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000

app.use(helmet());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology: true});

app.get('/', function (req, res) {
    res.send('hello world')
  })

  app.use('/users', users);
  app.use('/quotes', quotes);

  if(process.env.NODE_ENV=="production"){
    app.use(express.static('frontend/build'))
  }

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))