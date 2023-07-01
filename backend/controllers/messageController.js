const User = require('../models/userModel')
const Message = require('../models/messageModel')
const { body, validationResult } = require('express-validator')
const debug = require('debug')('members_only_app:messageController')


exports.create_message_post = [
    body('content').trim().isLength({min: 1}).escape(),

    async (req, res) => {
        const errors = validationResult(req)
        debug('current user id from create message post', req.user)

        if (!errors.isEmpty()){
            debug('there are errors validating in create message post')
            return res.status(400).json({
                errors: errors.array()
            })
        } else {
            try {
                debug('no errors validating in create message post')
                const posterId = req.user.id
                const content = req.body.content

                const newMessage = new Message({
                    poster: posterId,
                    content: content
                })

                await newMessage.save()
                
                res.json({
                    message:`create message post receive successful ${posterId}`,

                })
            } catch(err) {
                res.status(500).json({message: 'Error creating post'})
            }
            
        }
    }
]