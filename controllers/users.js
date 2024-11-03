const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
let users = require('../data/users')
const User = require('../models/user')

const generateId = () => {
    const maxId = users.length > 0
        ? Math.max(...users.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

usersRouter.post('/', async (request, response) => {
    const { username, name, password, role } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
        role
    })

    const savedUser = await user.save()

    response
        .status(201)
        .json({ savedUser, message: 'User registered successfully' })
})

usersRouter.post('/login', async (request, response) => {
    const { username, password } = request.body
    const user = User.findOne({ username })

    const passwordCorrect = user === undefined
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
        { expiresIn: 60 * 60 }
    )

    response
        .status(200)
        .send({ token, username: user.username, name: user.name, role: user.role })
})

module.exports = usersRouter