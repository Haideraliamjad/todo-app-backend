const errorHandler = (err, req, res, next) => {
    const message = err.message
    const status = err.status
    return res.status(status).json({
        message: message,
        status: status
    })
}
module.exports = errorHandler
