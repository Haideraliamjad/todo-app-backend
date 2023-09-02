module.exports = {
    PORT: 3000,
    DEVELOPMENT_LOGGER_LEVEL : 'info',
    PRODUCTION_LOGGER_LEVEL : 'info',
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
    JWT_TOKEN_SECRETE: process.env.JWT_TOKEN_SECRETE,
    JWT_TOKEN_EXPIRY: '2d',
    NODE_ENV: process.env.NODE_ENV
}
