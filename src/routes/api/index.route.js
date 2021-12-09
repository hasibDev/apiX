const categories = require('./categories.route')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    return res.send('Welcome to api X')
})

router.use('/categories', categories)

module.exports = router