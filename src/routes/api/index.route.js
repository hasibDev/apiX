const users = require('./user.route')
const express = require('express')

const router = express.Router()

router.use('/users', users)


module.exports = router