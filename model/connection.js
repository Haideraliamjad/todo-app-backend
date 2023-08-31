const mongoose = require('mongoose')
const { DB_URL, DB_NAME } = require('../config/config')
async function connection() {
    try {
        mongoose.set('strictQuery', false);
        const DB_ADDRESS = DB_URL;
        const DB_OPTIONS = {
            dbname: DB_NAME,
        };
        await mongoose.connect(DB_ADDRESS, DB_OPTIONS)
        console.log('connected with database')
    } catch (error) {
        console.log('Database connection error', error)
    }
}
module.exports = connection;
