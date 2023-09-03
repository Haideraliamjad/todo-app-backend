const bcrypt = require('bcrypt')
const { BCRYPT_SALT_ROUNDS } = require('../config/config')
const logger = require('../logger/logger')
class passwordUtility {
    static async hash(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
            return hashedPassword;

        } catch (error) {
            logger.error(error)
        }
    }

    static async verify(password, hashedPassword) {
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        return passwordMatch;
    }
}
module.exports = passwordUtility
