require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

const middleware = require('./utils/middleware')

const passport = require('passport')
const { jwtStrategy } = require('./utils/passport')

const votesRouter = require('./controllers/votes')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
passport.use('jwt', jwtStrategy)

app.use('/api/votes', votesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app