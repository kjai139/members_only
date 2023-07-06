const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('passport')
const debug = require('debug')('members_only_app:users')

router.post('/create', userController.create_user_post)

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        debug('logged out successfully')
        res.json({
            message: 'User logged out successfully'
        })
    }) 
    
    
})

router.post('/membership-auth', userController.secret_auth)



module.exports = router