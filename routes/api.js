const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const todoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')
// User Routes
router.post('/user/create', userController.create)
router.post('/user/update-password', auth, userController.updatePassword)
router.post('/user/delete', auth, userController.delete)
// Auth Routes
router.post('/user/login', authController.login)
router.post('/user/refresh-token', authController.refreshToken)
// Todo Routes
router.get('/todo/get', auth, todoController.get)
router.post('/todo/add', auth, todoController.add)
router.post('/todo/update', auth, todoController.update)
router.get('/todo/delete/:todoId', auth, todoController.delete)

module.exports = router
