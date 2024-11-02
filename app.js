const express = require('express')
const app = express()
const cors = require('cors')

const config = require('./utils/config')


const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const votesRouter = require('./controllers/votes')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/votes', votesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app