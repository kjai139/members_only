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

passport.serializeUser( function(user, done){
    debug('user from serialize', user, 'user id', user.id)
    done(null, user.id)
})

passport.deserializeUser( async function(id, done) {
    debug('deserialize called')
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})


//passport authenticate returns done(err, user, info)
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        debug(req.body)
        debug('info', info)
        debug('user', user)
        debug('cookie', req.headers.cookie)
        
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.json({
                message: info.message,
                
            })
        }

        req.logIn(user, (err) => {
            if (err){
                return next(err)
            }
            res.json({
                message: 'authentication successful', 
                isAuthenticated: true,
                cookie: req.headers.cookie
                
            })
            
            
            
        })
        
        

        
    }) 
    (req, res, next);
    // this is a way to immediately invoke function expression, this is IFFE format of giving the callback function (err, user, info)(req, res, next) passport authenticate expects a function not the result of the function call

    //if you don't pass the req res next to authenticate the localstrategy won't have the things to work with in the callback
})

router.post('/auth', (req, res) => {
    // debug(req.headers.cookie)
    // debug(req.session, 'the session')
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.user
        })
    } else {
        res.json({
            isAuthenticated: false,
            session: req.session,
            cookie: req.headers.cookie,
            user: req.user

        })
    }
})

router.get('/auth', (req, res) => {
    // debug(req.headers.cookie)
    // debug(req.session, 'the session')
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.user
        })
    } else {
        res.json({
            isAuthenticated: false,
            session: req.session,
            cookie: req.headers.cookie,
            user: req.user

        })
    }
})

module.exports = router