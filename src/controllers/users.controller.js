const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const { body, validationResult } = require('express-validator')
const { User } = require('../models')

/**
 * User Login
 */
const login = async function (req, res) {
   const user = await User.findOne({ where: { email: req.body.email } })
   const checkPassword = await bcrypt.compare(req.body.password, user.password)
   const jwtSecret = process.env.JWT_SECRET

   if (checkPassword) {
      jwt.sign({ user }, jwtSecret, (err, token) => {
         if (err) {
            return res.status(500).json({ message: 'Error in JWT token generation' })
         }
         return res.json({ token, user })
      })
   } else {
      return res.status(401).json({ message: 'Invalid Email or Password' })
   }

}

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
   const hashPassword = await bcrypt.hash(password, 10)

   try {
      const user = await User.create({ firstName, lastName, email, password: hashPassword, authtype: 'users' })
      const jwtSecret = process.env.JWT_SECRET

      jwt.sign({ user }, jwtSecret, (err, token) => {
         if (err) return res.status(500).json({ message: 'Error in JWT token generation' })
         return res.json({ data: user, token })
      })

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
            body('firstName').notEmpty().isLength({ max: 50 }),
            body('lastName').notEmpty().isLength({ max: 50 }),
            body('email').notEmpty().custom(async (email) => {
               const user = await User.findOne({ where: { email } })
               if (user) {
                  throw new Error('E-mail already in use')
               }
               return true
            }),

            body('password').notEmpty().isLength({ min: 6, max: 30 }),
            body('confirmed_password').custom((value, { req }) => {
               if (value !== req.body.password) {
                  throw new Error('Password confirmation does not match password')
               }
               return true
            })
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
   login, readAll, readOne, create, update, destroy, validate
}