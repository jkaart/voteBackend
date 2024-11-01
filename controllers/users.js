const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

let users = [
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



module.exports = usersRouter