const express = require("express")
const categoriesController = require('../../controllers/categories.controller')
const auth = require('../../middlewares/auth')

const router = express.Router({ mergeParams: true })

/**
 * Alies to /categories
 */
router.get('/', auth(), categoriesController.readAll)
router.post('/', auth(), categoriesController.validate('create'), categoriesController.create)

router.get('/:id', auth(), categoriesController.readOne)
router.put('/:id', auth(), categoriesController.validate('update'), categoriesController.update)
router.patch('/:id', auth(), categoriesController.update)
router.delete('/:id', auth(), categoriesController.destroy)


// Export to outside
module.exports = router