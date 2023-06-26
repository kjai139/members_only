const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username})
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
            return done(err)
        }
    })
)

passport.serializeUser( (user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async(id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch(err) {
        done(err)
    }
})

module.exports = passport;