const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const todoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')
// User Routes
router.post('/user/create', userController.create)
router.post('/user/update', userController.updatePassword)
router.post('/user/delete', userController.delete)
// Todo Routes
router.post('/user/login', authController.login)
router.post('/user/logout', authController.logout)
// Auth Routes
router.get('/todo/get', auth, todoController.get)
router.post('/todo/add', auth, todoController.add)
module.exports = router
