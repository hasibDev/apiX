const categories = require('./categories.route')
const users = require('./user.route')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    return res.send('Welcome to api X')
})

router.use('/categories', categories)
router.use('/users', users)

module.exports = router