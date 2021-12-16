const admins = require('./admins.route')
const users = require('./users.route')
const express = require('express')

const router = express.Router()

router.use('/admins', admins)
router.use('/users', users)


module.exports = router