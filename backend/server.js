const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/users')
const app = express()
app.use(cors())
app.use('/users', userRouter)
