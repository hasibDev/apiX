const usersController = require('../../controllers/users.controller')
const express = require("express")

const router = express.Router({ mergeParams: true })

/**
 * Alies to /categories
 */
router.get('/', usersController.readAll)
router.post('/', usersController.validate('create'), usersController.create)

router.get('/:id', usersController.readOne)
router.put('/:id', usersController.validate('update'), usersController.update)
router.patch('/:id', usersController.update)
router.delete('/:id', usersController.destroy)


// Export to outside
module.exports = router