const customErrorHandler = require('../utils/customErrorHandler')
const errorHandler = (err, req, res, next) => {
    let message = 'Internal server error'
    let status = 500
    if (err instanceof customErrorHandler) {
        message = err.message
        status = err.status
    }
    return res.status(status).json({
        message: message,
        status: status
    })
}
module.exports = errorHandler
