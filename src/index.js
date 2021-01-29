const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
const connectDb = require("./utils/mongoDb");

const routes = require('./routes')

const { port } = require("./config")
const app = express()
connectDb()

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)
    process.exit(1) 
})

// adding Helmet to enhance API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

// enabling CORS for all requests
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, A-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
})

//error handlers
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status : 500, error : 'Something went wrong!!' });
});

//routers
app.use('/api', routes)


app.listen(port, () => {
    console.log(`Sever is running on port : ${port}`)
})