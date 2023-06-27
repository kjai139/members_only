const User = require('../models/userModel')


exports.login_post = async (req, res) => {
    

    try {
        const username = req.body.username
        const user = await User.findOne({name: username})
        if (user) {
            console.log(user)
            res.json({
                message: user.id
            })
        } else {
            console.log(user)
            res.json({
                message: 'user not found'
            })
        }
    } catch(err){
        console.log(err)
        res.json({
            message: err
        })
    }
}