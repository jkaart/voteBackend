const config = require('./utils/config')
const express = require('express')
const path = require('path')
const app = express()
require('express-async-errors')
const cors = require('cors')

const passport = require('passport')
const { jwtStrategy } = require('./utils/passport')

const votingRouter = require('./controllers/voting')
const votesRouter = require('./controllers/votes')
const voteRouter = require('./controllers/vote')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
passport.use('jwt', jwtStrategy)

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api/voting', votingRouter)
app.use('/api/votes', votesRouter)
app.use('/api/vote', voteRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app