const User = require('../models/userModel')


exports.create_user_post = async (req, res) => {
    try {
        const {username, userPassword } = req.body
        
        res.json({
            message:`received username: ${username} | password: ${userPassword}`
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error creating user'})
    }
}