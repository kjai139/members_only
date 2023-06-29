const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    poster: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    content: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

MessageSchema.virtual('url').get(function (){
    return `/message/${this._id}`
})

module.exports = mongoose.model('Message', MessageSchema)