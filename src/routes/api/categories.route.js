const categoriesController = require('../../controllers/categories.controller')
const express = require("express")

const router = express.Router({ mergeParams: true })

/**
 * Alies to /categories
 */
router.get('/', categoriesController.readAll)
router.post('/', categoriesController.validate('create'), categoriesController.create)

router.get('/:id', categoriesController.readOne)
router.put('/:id', categoriesController.validate('update'), categoriesController.update)
router.patch('/:id', categoriesController.update)
router.delete('/:id', categoriesController.destroy)


// Export to outside
module.exports = router