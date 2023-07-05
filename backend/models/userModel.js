const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    membership_status: {type: String, enum:['admin', 'member', 'non-member'], default: 'non-member'},
    membership_password: {type: String, default: 'magicPotato'}
})

module.exports = mongoose.model('User', UserSchema)