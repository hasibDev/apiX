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
    return res.json({ data: 'Create Data' })
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


// Export to outside
module.exports = {
    readAll, readOne, create, update, destroy
}