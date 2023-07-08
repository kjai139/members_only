const User = require('../models/userModel')
const Message = require('../models/messageModel')
const { body, validationResult } = require('express-validator')
const debug = require('debug')('members_only_app:messageController')


exports.create_message_post = [
    body('content').trim().isLength({min: 1}),

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

exports.messages_get = async (req, res, next) => {
    try {
        const curPage = req.query.page
        const count = await Message.countDocuments()
        debug('count', count)
        const totalPages = Math.ceil(count / 10)
        debug(totalPages)
        const skip = (curPage - 1 ) * 10
        debug(skip)
        const posts = await Message.find().sort({ 
            createdAt: -1
        }).skip(skip).limit(10).populate('poster', '-password')
        res.json({
            curpage: curPage,
            totalPages: totalPages,
            posts: posts
        })

    }catch(err) {
        res.status(500).json({
            message: 'error getting posts'
        })
    }
}

exports.messages_delete_post = async (req, res, next) => {
    try {
        const id = req.params.id

        const result = await Message.findByIdAndDelete(`${id}`)

        res.json({
            message: `Document #${id} was successfully deleted`
        })
    }catch(err) {
        res.json({
            message: `error: ${err}`
        })
    }
}