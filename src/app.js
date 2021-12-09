const express = require('express')
const cors = require('cors')
const routes = require('./routes/index.route')
const apiRoutes = require('./routes/api/index.route')

// Enviroment Configuration
const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
   require('dotenv').config()
}

// App Instance
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
// app.use(expressValidator())

// Routes
app.use('/', routes)
app.use('/api', apiRoutes)


module.exports = { app }
