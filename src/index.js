const http = require('http')
const { app } = require('./app')


// Application Configuration
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 5000

// Server Running
const server = http.createServer(app)

server.on('listening', function () {
    console.log(`Application running on http://${host}:${port}`)
})
server.listen(port)