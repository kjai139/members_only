const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/users')
const app = express()
app.use(cors())
app.use('/users', userRouter)



app.listen(4000, () => {
    console.log('Server started on port 4000!')
})