const userModel = require('../model/User')
const customErrorHandler = require('../utils/customErrorHandler')
const passwordUtility = require('../utils/passwordUtility')
const tokenUtility = require('../utils/tokenUtility')
class authController {
    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            let ifExist = await userModel.findOne({ email: email })
            if (!ifExist) {
                return next(new customErrorHandler('account not found'))
            }
            let ifPasswordMatch = await passwordUtility.verify(password, ifExist.password)
            if (!ifPasswordMatch) {
                return next(new customErrorHandler('email or password is incorret'))
            }
            let accessToken = tokenUtility.generateToken({ email: ifExist.email, _id: ifExist._id })
            return res.json({
                status: 'success',
                token: accessToken
            })
        } catch (error) {
            return next(error)
        }
    }

    static async logout(req, res, next) {
        try {

        } catch (error) {
            return next(error)
        }
    }
}
module.exports = authController