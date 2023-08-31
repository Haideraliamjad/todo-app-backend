const errorWrapper = (inputFunction) => {
    return async (req, res, next) => {
        try {
            inputFunction(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = errorWrapper
