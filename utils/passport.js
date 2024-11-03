const { Strategy, ExtractJwt } = require('passport-jwt')
const users = require('../data/users')

const jwtOptions = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
    console.log('Payload', payload)
    const user = users.find(user => user.username === payload.username)
    if (!user) {
        return done(null, false)
    }
    done(null, user)
}

const jwtStrategy = new Strategy(jwtOptions, jwtVerify)
module.exports = { jwtStrategy }