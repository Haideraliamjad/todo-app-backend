class customErrorHandler extends Error {
    constructor(message, status = 200) {
        super(message)
        this.message = message
        this.status = status
    }
}
module.exports = customErrorHandler
