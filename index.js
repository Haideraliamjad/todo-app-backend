require('dotenv').config()
const express = require('express')
const app = express()
const { PORT, ORIGIN_DOMAIN, HTTP_METHODS } = require('./config/config')
const api = require('./routes/api')
const errorHandler = require('./middlewares/errorHandler')
const bodyParser = require('body-parser')
const connection = require('./model/connection')
const logger = require('./logger/logger')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser');
connection()
app.use(cookieParser())
app.use(helmet())
app.use(cors({
    origin: ORIGIN_DOMAIN,
    methods: HTTP_METHODS
}))
app.use(bodyParser.json())
app.use('/api', api)
app.use(errorHandler)
app.listen(PORT, function () {
    logger.info(`Server is ruinng at port ${PORT}`)
})