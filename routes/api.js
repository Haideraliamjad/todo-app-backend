const router = require('express').Router()
const userController = require('../controllers/userController')
router.post('/create', userController.create)
router.post('/update', userController.updatePassword)
router.post('/delete', userController.delete)
module.exports = router
