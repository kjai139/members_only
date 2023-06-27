const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const debug = require('debug')('members_only_app:login')

passport.use(new LocalStrategy( {
    usernameField: 'username',
    passwordField: 'userPassword'
    //if object not specified here the callback 1st and 2nd argument always look for req.body.username and req.body.password
}, async(username, password, done) => {
    try {
        debug('username and password', username, password)
        const user = await User.findOne({ name: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        const passwordsMatch = await bcrypt.compare(password, user.password)
        
        if (passwordsMatch) {
            return done(null, user);
        } else {
            console.log('incorrect pw')
            return done(null, false, {message: 'Incorrect Password'})
        }
    } catch (err) {
        return done(err)
    }

}))

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        debug(req.body)
        debug(info)
        
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.json({
                message: info.message
            })
        }

        res.json({
            message: 'authentication successful', user
        })
    }) 
    (req, res, next)
    // this is a way to immediately invoke function expression, this is IFFE format of giving the callback function (err, user, info)(req, res, next) passport authenticate expects a function not the result of the function call
})

module.exports = router