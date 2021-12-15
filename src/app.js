const express = require('express')
const cors = require('cors')
const routes = require('./routes/index.route')
const apiRoutes = require('./routes/api/index.route')

// Import Enviroment Variables
require('dotenv').config()

// App Instance
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api', apiRoutes)
app.use('/', routes)
app.use('*', (req, res) => {
    res.status(404).json({ status: 404, message: 'Route not exits!' })
})

module.exports = { app }
