const { body, validationResult } = require('express-validator')

/**
 * Read All Data
 */
const readAll = function (req, res) {
    return res.json({ data: 'Find All', id: req.params.id })
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
    console.log(method)
    switch (method) {
        case 'create':
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