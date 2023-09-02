const jwt = require('jsonwebtoken')
const logger = require('../logger/logger')
const { JWT_TOKEN_SECRETE, JWT_TOKEN_EXPIRY } = require('../config/config')
class tokenUtility {
    static generateToken(payload) {
        try {
            return jwt.sign(payload, JWT_TOKEN_SECRETE, { expiresIn: JWT_TOKEN_EXPIRY })
        } catch (error) {
            logger.error(error)
        }
    }

    static verfiyToken(token) {
        return jwt.verify(token, JWT_TOKEN_SECRETE)
    }
}
module.exports = tokenUtility