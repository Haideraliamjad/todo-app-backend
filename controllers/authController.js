const userModel = require('../model/User')
const customErrorHandler = require('../utils/customErrorHandler')
const passwordUtility = require('../utils/passwordUtility')
const tokenUtility = require('../utils/tokenUtility')
const CONFIGRATION = require('../config/config')
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
            let accessToken = tokenUtility.generateToken({ _id: ifExist._id }, CONFIGRATION.JWT_ACCESS_TOKEN_SECRETE, CONFIGRATION.JWT_ACCESS_TOKEN_EXPIRY)
            let refreshToken = tokenUtility.generateToken({ _id: ifExist._id }, CONFIGRATION.JWT_REFRESH_TOKEN_SECRETE, CONFIGRATION.JWT_REFRESH_TOKEN_EXPIRT)
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: CONFIGRATION.REFRESH_COOKIE_EXPIRY });
            return res.json({
                status: 'success',
                accessToken,
            })
        } catch (error) {
            return next(error)
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                return next(new customErrorHandler('unauthorized', 401));
            }
            const refreshVerified = tokenUtility.verfiyToken(refreshToken, CONFIGRATION.JWT_REFRESH_TOKEN_SECRETE)
            if (!refreshVerified) {
                return next(new customErrorHandler('unauthorized', 401));
            }
            const accessToken = tokenUtility.generateToken({ _id: refreshVerified._id }, CONFIGRATION.JWT_ACCESS_TOKEN_SECRETE, CONFIGRATION.JWT_ACCESS_TOKEN_EXPIRY)
            res.json({
                'status': 'success',
                'accessToken': accessToken
            })
        } catch (error) {
            return next(error)
        }
    }
}
module.exports = authController