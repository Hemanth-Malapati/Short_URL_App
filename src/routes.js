const express = require('express')
const app = express()

const shortUrlRouter = require('./controllers/shortURLController')

app.use('/shorturl', shortUrlRouter)

module.exports = app