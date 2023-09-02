const jwt = require('jsonwebtoken')
const logger = require('../logger/logger')
class tokenUtility {
    static generateToken(payload, JWT_TOKEN_SECRETE, JWT_TOKEN_EXPIRY) {
        try {
            return jwt.sign(payload, JWT_TOKEN_SECRETE, { expiresIn: JWT_TOKEN_EXPIRY })
        } catch (error) {
            logger.error(error)
        }
    }

    static verfiyToken(token, JWT_TOKEN_SECRETE) {
        return jwt.verify(token, JWT_TOKEN_SECRETE)
    }
}
module.exports = tokenUtility