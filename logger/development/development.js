const winston = require('winston')
const { DEVELOPMENT_LOGGER_LEVEL } = require('../../config/config')
const development = () => {
    return winston.createLogger({
        level: DEVELOPMENT_LOGGER_LEVEL,
        format: winston.format.json(),
        transports: [
            new winston.transports.Console()
        ]
    })
}
module.exports = development
