const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const { PRODUCTION_LOGGER_LEVEL } = require('../../config/config')
const production = () => {
    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} ${level}: ${message}`
    });

    return createLogger({
        level: PRODUCTION_LOGGER_LEVEL,
        format: combine(
            timestamp(),
            myFormat
        ),
        transports: [
            new transports.File({ filename: '.../../logs/combined.log' }),
        ]
    })
}
module.exports = production