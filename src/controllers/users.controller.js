const { body, validationResult } = require('express-validator')

const { User } = require('../models')

/**
 * Read All Data
 */
const readAll = async function (req, res) {

   try {
      const data = await User.findAll()

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
      const data = await User.findByPk(id)

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

   const { firstName, lastName, email, password } = req.body

   try {
      const data = await User.create({ firstName, lastName, email, password })
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
   const { firstName, lastName, email, password } = req.body

   try {
      await User.update(
         { firstName, lastName, email, password },
         { where: { id } }
      )

      const data = await User.findByPk(id)
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

   await User.destroy({ where: { id } })
   return res.json({ message: 'Deleted Successfully', id })
}

/**
 * Request Validation
 */
const validate = function (method) {
   switch (method) {
      case 'create':
         return [
            body('firstName').notEmpty(),
            body('lastName').notEmpty(),
            body('email').notEmpty(),
            body('password').notEmpty()
         ]
         break

      case 'update':
         return [
            body('firstName').notEmpty(),
            body('lastName').notEmpty(),
            body('email').notEmpty(),
         ]
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