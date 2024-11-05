const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            message: 'Invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        role: user.role,
        id: user.id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        //{ expiresIn: 60 * 60 }
    )

    response
        .status(200)
        .send({ token, username: user.username, name: user.name, role: user.role })
})

module.exports = loginRouter