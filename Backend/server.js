const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./api/users');
const quotes = require('./api/quotes')
const app = express();
const cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.use(helmet());

app.use(express.json())

app.use(cors(corsOptions))

mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology: true});

app.get('/', function (req, res) {
    res.send('hello world')
  })

  app.use('/users', users);
  app.use('/quotes', quotes);

app.listen(5000, () => console.log(`Server started on port 5000`))