const customErrorHandler = require('../utils/customErrorHandler')
const tokenUtility = require('../utils/tokenUtility')
const { JWT_ACCESS_TOKEN_SECRETE} = require('../config/config')
const auth = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(new customErrorHandler('unauthorized', 401));
        }
        const plainToken = authHeader.split(' ')[1]
        const tokenVerified = tokenUtility.verfiyToken(plainToken, JWT_ACCESS_TOKEN_SECRETE)
        if (!tokenVerified) {
            return next(new customErrorHandler('unauthorized', 401));
        }
        req.userId = tokenVerified._id
        next()
    } catch (error) {
        next(new customErrorHandler('unauthorized', 401))
    }
}
module.exports = auth