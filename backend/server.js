const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const mesasgeRouter = require('./routes/message')

const app = express()

const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const debug = require('debug')('members_only_app:server')

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
app.use(cors({
    origin: 'https://railway.app/project/be8eb327-f4b0-4ff7-9bbf-cd04913075d6/service/9365b8d4-794c-4eb2-8d63-9248b8b6ba67',
    credentials: true
}))
app.use(express.json())

app.use(cookieParser())
app.use(session({
    secret: 'keyboard-dog',
    resave: false,
    saveUninitialized: true,
    name:'theCookie'
}))



app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))

//passport and need set up session



app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/message', mesasgeRouter)




app.listen(4000, () => {
    console.log('Server started on port 4000!')
})