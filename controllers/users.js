const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

let users = [
    {
        username: 'admin',
        passwordHash: '$2b$10$ASPoIxFCELt60boUlk7mWujElkF/UbQkYM7bBCtLYQO3CyjeNrN8y',
        name: 'Admin Admin',
        role: 'admin',
        id: '1'
    },
    {
        username: 'testi',
        passwordHash: '$2b$10$ewgVSsM/.C3Yi2/qz9zlYeYA/FHeWaEptQbLGYAjIe/kNVfhtDOge',
        name: 'Testi Testaaja',
        role: 'user',
        id: '2'
    }
]

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
    const userFound = users.some(user => user.username === username)
    if (userFound) return response.status(409).json({
        message: 'Account already exists'
    })
    const user = {
        username: username,
        passwordHash: passwordHash,
        name: name,
        role: role,
        id: generateId()
    }

    users = users.concat(user);
    console.log(users);

    return response.status(201).json({
        message: 'User registered successfully'
    })
})

usersRouter.post('/login', async (request, response) => {
    const { username, password } = request.body;
    console.log(password)
    const user = users.find(user => user.username === username)


    const passwordCorrect = user === undefined
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            message: 'invalid username or password'
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