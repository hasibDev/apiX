const messageController = require('../../controllers/message.controller')
const express = require('express')

const router = express.Router({ mergeParams: true })

/**
 * @Route   /message
 */
router.post('/', messageController.sendMessage)

module.exports = router