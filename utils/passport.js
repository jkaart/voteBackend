const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user')

const jwtOptions = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
    console.log('Payload', payload)
    const user = User.findOne(payload.username)
    if (!user) {
        return done(null, false)
    }
    done(null, user)
}

const jwtStrategy = new Strategy(jwtOptions, jwtVerify)
module.exports = { jwtStrategy }