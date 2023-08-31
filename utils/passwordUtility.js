const bcrypt = require('bcrypt')
const { BCRYPT_SALT_ROUNDS } = require('../config/config')
class passwordUtility {
    static async hash(password) {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        return hashedPassword;
    }

    static async verify(password, hashedPassword) {
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        return passwordMatch;
    }
}
module.exports = passwordUtility
