const User = require('../models/userModel')
const { body, validationResult } = require('express-validator')
const debug = require('debug')('members_only_app:userController')
const bcrypt = require('bcrypt')


exports.create_user_post = [
    body('username', 'Name must not be empty')
    .trim()
    .isLength({min: 1})
    .escape(),
    body('userPassword', 'Must not be empty and contains more than 7 letters')
    .trim()
    .isLength({min: 7})
    .escape(),

    async (req, res) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()){
            debug('there are errors')
            return res.status(400).json({
                errors: errors.array()
            })
        } else {
            debug('no errors validating form, proceeding')
            try {
                const {username, userPassword } = req.body
                const salt = await bcrypt.genSalt(10)
                const hashedPw = await bcrypt.hash(userPassword, salt)
        
                // const newUser = new User({
                //     name: username,
                //     password: hashedPw
                // })

                // await newUser.save()
                debug('user successfully registered', hashedPw)
                
                res.json({
                    success: true
                })
            } catch (error) {
                console.error(error)
                res.status(500).json({message: 'Error creating user'})
            }
            
        }
        
    }
]