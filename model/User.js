const { Schema, model } = require('mongoose')
const todoSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
})
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    todos: [todoSchema]
})
const userModel = model('User', userSchema)
module.exports = userModel
