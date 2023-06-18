const User = require('../models/userModel')


exports.create_user_post = async (req, res) => {
    try {

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error creating user'})
    }
}