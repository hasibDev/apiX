const { body, validationResult } = require('express-validator')

const { Category } = require('../models')

/**
 * Read All Data
 */
const readAll = async function (req, res) {
   try {
      const data = await Category.findAll()
      return res.json({ data })
   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong!', error })
   }
}

/**
 * Read One Data
 */
const readOne = async function (req, res) {
   const { id } = req.params

   try {
      const data = await Category.findByPk(id)

      if (!data) return res.status(404).json({ message: `No data found for the id: ${id}` })

      return res.json({ data })
   } catch (error) {
      return res.status(500).json({ error })
   }
}

/**
 * Create New Data
 */
const create = async function (req, res) {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
   }

   const { name, description } = req.body

   try {
      const data = await Category.create({ name, description })
      return res.json({ data })
   } catch (error) {
      return res.status(500).json({ error })
   }
}
/**
 * Update Old Data
 */
const update = async function (req, res) {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
   }

   const { id } = req.params
   const { name, description } = req.body

   try {
      await Category.update(
         { name, description },
         { where: { id } }
      )

      const data = await Category.findByPk(id)
      return res.json({ data })

   } catch (error) {
      return res.status(500).json({ error })
   }

}

/**
 * Delete Data
 */
const destroy = async function (req, res) {
   const { id } = req.params

   await Category.destroy({ where: { id } })
   return res.json({ message: 'Deleted Successfully', id })
}

/**
 * Request Validation
 */
const validate = function (method) {
   switch (method) {
      case 'create':
         return [body('name').notEmpty()]
         break

      case 'update':
         return [body('name').notEmpty()]
         break

      default:
         return []
         break
   }
}


// Export to outside
module.exports = {
   readAll, readOne, create, update, destroy, validate
}