const customErrorHandler = require('../utils/customErrorHandler')
const userModel = require('../model/User')
const passwordUtility = require('../utils/passwordUtility')
class userController {
    static async create(req, res, next) {
        const { name, email, password } = req.body
        const hashedPassword = await passwordUtility.hash(password)
        try {
            let ifExist = await userModel.findOne({ email: email }).count()
            if (ifExist > 0) {
                return next(new customErrorHandler('email already taken'))
            }
            let user = new userModel({
                name,
                email,
                password: hashedPassword
            })
            await user.save()
            return res.json({
                status: 'success',
                message: 'account created successfully'
            })
        } catch (error) {
            return next(error)
        }
    }


    static async updatePassword(req, res, next) {
        try {
            let ifExist = await userModel.findById(req.userId).count()
            if (ifExist === 0) {
                return next(new customErrorHandler('email not found'))
            }
            const hashedPassword = await passwordUtility.hash(req.body.password)
            await userModel.updateOne({ _id: req.userId }, {
                $set: { password: hashedPassword }
            })
            return res.json({
                status: 'success',
                message: 'password updated successfully'
            })
        } catch (error) {
            return next(error)
        }
    }


    static async delete(req, res, next) {
        try {
            let ifExist = await userModel.findByIdAndDelete(req.userId)
            if (!ifExist) {
                return next(new customErrorHandler('account not found'))
            }
            return res.json({
                status: 'success',
                message: 'account deleted'
            })
        } catch (error) {
            return next(error)
        }
    }

}
module.exports = userController