const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { checkUserRole, auth } = require('../utils/middleware')

// Create new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password, role } = request.body
    if (!(username || name || password || role)
        || (username === '' || name === '' || password === '' || role === '')
    ) {
        return response.status(422).json({ error: 'Some required content missing or empty string' })
    }

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

// Get all users
usersRouter.get('/', auth, checkUserRole(['admin']), async (request, response) => {
    const users = await User.find({}).populate('createdVotes').populate('votedVotes')
    if (users.length > 0) {
        return response.json(users)
    }
    response.status(404).json(users)
})

// Delete user itself
usersRouter.delete('/', auth, async (request, response) => {
    const id = request.user.id
    const result = await User.findByIdAndDelete(id)
    if (!result) {
        return response.status(404).end()
    }
    response.status(204).end()
})

module.exports = usersRouter