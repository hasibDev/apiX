const express = require('express')
const cors = require('cors')
const http = require('http')
const routes = require('./routes/index.route')
const apiRoutes = require('./routes/api/index.route')

// Dotenv Config
require('dotenv').config()

// Application Configuration
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 5000

// App Instance
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/', routes)
app.use('/api', apiRoutes)


// Server Running
const server = http.createServer(app)

server.on('listening', function () {
  console.log(`Application running on http://${host}:${port}`)
})

server.listen(port)

module.exports = { app }
