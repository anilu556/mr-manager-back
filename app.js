const express = require('express')
const app = express()
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT || 3001;

//import api routes
const api = require('./src/routes/api');

//setup mongoose and mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mr-manager',{
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log("Succesful")
})

//middleware
app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//json format
app.set('json spaces', 2)

//test
app.get('/',  (req, res) => {
  res.send('Hello Mr. Manager')
})

//CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.options("*", (request, response, next) => {
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.send(200);

  next();
})

//API route
app.use('/api/v1', api);

//error 404
app.use((request, response) => {
  const ERROR = {
    message: '404. Not Found'
  }
  response
    .status(404)
    .json(ERROR);
});

//error 500
app.use((err, request, response, next) => {
  const ERROR = {
    message: '500. Server Error'
  }
  response
    .status(500)
    .json(ERROR);
});

app.listen(PORT, () => {
  const msg = chalk.blue(`Server is listening on PORT: ${PORT}`);

  console.log(msg);

})
