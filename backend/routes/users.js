const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('passport')
const debug = require('debug')('members_only_app:users')

router.post('/create', userController.create_user_post)
// TO LOG OUT YOU HAVE TO USE DELETE UNLIKE WHAT OFFICIAL DOCS SAY
router.delete('/logout', (req, res, next) => {
    req.logout(function(err) {
        if(err) {
            debug(err)
            return next(err)
        }
        debug('user logged out')
        
    })

    if (!req.user) {
        debug(req.user)
        
        res.json({
            message: `User logged out successfully`,
            success:true,
        })
    } else {
        debug(req.user)
        res.json({
            message:`logout failed. ${req.user}`
        })
    }
    
    
})

router.post('/membership-auth', userController.secret_auth)



module.exports = router