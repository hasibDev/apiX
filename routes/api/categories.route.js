const categoriesController = require('../../controllers/categories.controller')
const express = require("express")

const router = express.Router({ mergeParams: true })

/**
 * Alies to /categories
 */
router.route('/')
   .get(categoriesController.readAll)
   .post(categoriesController.create)

router.route('/:id')
   .get(categoriesController.readOne)
   .put(categoriesController.update)
   .delete(categoriesController.destroy)


// Export to outside
module.exports = router