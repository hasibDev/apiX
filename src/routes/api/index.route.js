const categories = require('./categories.route')
const users = require('./user.route')
const message = require('./message.route')
const express = require('express')

const router = express.Router()

router.use('/categories', categories)
router.use('/users', users)
router.use('/message', message)

module.exports = router