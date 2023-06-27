const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const debug = require('debug')('members_only_app:passport')


passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'userPassword',
    }, async (username, password, done) => {
        try {
            
            const user = await User.findOne({ name: username})
            if (!user) {
                
                return done(null, false, {message: 'Incorrect username'})
                
            } else {
                const passwordsMatch = await bcrypt.compare(password, user.password)

                if (passwordsMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Incorrect password'})
                }
            }
        } catch(err) {
            console.log(err)
            return done(err)
        }
    })
)

passport.serializeUser( function(user, done){
    debug('user from serialize', user)
    done(null, 'user.id')
})

passport.deserializeUser( async function(id, done){
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch(err) {
        done(err)
    }
})

