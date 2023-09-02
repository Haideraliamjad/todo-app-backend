const userModel = require('../model/User')
const customErrorHandler = require('../utils/customErrorHandler')
const logger = require('../logger/logger')
class todoController {
    static async get(req, res, next) {
        try {
            const user = await userModel.findById(req.userId)
            const todos = user.todos
            return res.json(todos)
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { title, description, todoId } = req.body
            const userId = req.userId
            const user = await userModel.findById(userId)
            const todoIndex = user.todos.findIndex((todo) => todo._id.toString() === todoId)
            user.todos[todoIndex].title = title
            user.todos[todoIndex].description = description
            await user.save()
            return res.json({
                status: 'success',
                message: 'todo updated successfully'
            })
        } catch (error) {
            return next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { todoId } = req.params
            const userId = req.userId
            const user = await userModel.findById(userId)
            const todoIndex = user.todos.findIndex((todo) => todo._id.toString() === todoId)
            if (todoIndex === -1) {
                return next(new customErrorHandler('todo not found'))
            }
            user.todos.splice(todoIndex, 1)
            await user.save()
            return res.json({
                status: 'success',
                message: 'todo deleted successfully'
            })
        } catch (error) {
            return next(error)
        }
    }

    static async add(req, res, next) {
        try {
            const { title, description } = req.body
            const user = await userModel.findById(req.userId)
            const data = {
                title,
                description
            }
            user.todos.push(data)
            await user.save()
            return res.json({
                status: 'success',
                message: 'todo added successfully'
            })
        } catch (error) {
            logger.log(error)
            return next(error)
        }
    }

}
module.exports = todoController