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
const readOne = function (req, res) {
    return res.json({ data: 'Find One', id: req.params.id })
}

/**
 * Create New Data
 */
const create = function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    return res.json({ data: 'Data Created' })
}
/**
 * Update Old Data
 */
const update = function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    return res.json({ data: 'Updated Successfully' })
}

/**
 * Delete Data
 */
const destroy = function (req, res) {
    return res.json({ data: 'Delete Successfully' })
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