const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const mesasgeRouter = require('./routes/message')

const app = express()

const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
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
    origin: 'https://bold-cactus-production.up.railway.app',
    credentials: true,
    methods:['GET', 'POST', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization', 'X-Custom-Header'],
    exposedHeaders: [
        'Access-Control-Allow-Origin'
    ]
}))
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://bold-cactus-production.up.railway.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header');
    next();
  });

app.use(express.json())

app.use(cookieParser())
app.use(session({
    secret: 'keyboard-dog',
    resave: false,
    saveUninitialized: true,
    name:'theCookie',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: mongoDB,
        collectionName: 'mySessions'
    })
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