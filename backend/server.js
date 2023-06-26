const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/users')
const app = express()

const passport = require('./modules/passport')
const session = require('express-session')

require('dotenv').config()
const mongoose = require('mongoose')
const mongoDB = process.env.MONGO_LOGIN

const main = async () => {
    try {
        await mongoose.connect(mongoDB)
        console.log('mongodb login successful')
    } catch (err) {
        console.log(err)
    }
}

main()
app.use(cors())
app.use(express.json())

app.use(session({
    secrets: 'cookies',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

//passport and need set up session



app.use('/users', userRouter)



app.listen(4000, () => {
    console.log('Server started on port 4000!')
})