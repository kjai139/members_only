const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/create', userController.create_user_post)

module.exports = router