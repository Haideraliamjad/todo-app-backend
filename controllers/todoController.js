const userModel = require('../model/User')
class todoController {
    static get(req, res, next) {
        console.log(req.userId)
        return res.json({
            name: "Haider"
        })
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
            console.log(error)
            return next(error)
        }
    }

}
module.exports = todoController