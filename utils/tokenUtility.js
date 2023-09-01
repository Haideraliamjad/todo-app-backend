const jwt = require('jsonwebtoken')
const { JWT_TOKEN_SECRETE, JWT_TOKEN_EXPIRY } = require('../config/config')
class tokenUtility {
    static async generateToken(payload) {
        try {
            return await jwt.sign(payload, JWT_TOKEN_SECRETE, { expiresIn: JWT_TOKEN_EXPIRY })
        } catch (error) {
            console.log(error)
        }
    }

    static  verfiyToken(token) {
        return  jwt.verify(token, JWT_TOKEN_SECRETE)
    }
}
module.exports = tokenUtility