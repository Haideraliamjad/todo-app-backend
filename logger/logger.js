const production = require('./productions/production')
const development = require('./development/development')
const { NODE_ENV } = require('../config/config')
let logger = null
if (NODE_ENV === 'production') {
    logger = production()
}
if (NODE_ENV === 'development') {
    logger = development()
}
module.exports = logger
