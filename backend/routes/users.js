const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('../modules/passport')

router.post('/create', userController.create_user_post)



module.exports = router