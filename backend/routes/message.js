const express = require('express')
const router = express.Router()

const passport = require('passport')
const debug = require('debug')('members_only_app:message')
const messageController = require('../controllers/messageController')

router.post('/create', messageController.create_message_post)

router.get('/get', messageController.messages_get)


module.exports = router