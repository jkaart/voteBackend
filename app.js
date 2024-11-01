const express = require('express')
const app = express()
const cors = require('cors')



const votesRouter = require('./controllers/votes')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())

app.use('/api/votes', votesRouter)
app.use('/api/users', usersRouter)

module.exports = app