const passport = require('passport')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError' || error.name === 'jwt') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }

    next(error)
}

const auth = (request, response, next) => {
    passport.authenticate('jwt', (error, user, info) => {
        if (error) {
            return next(error)
        }
        if (!user) {
            return response.status(403).json({ error: `Unauthorized: ${info.message}` })
        }
        if (!user.role !== request.role) {
            return response.status(404).json({ error: 'User not found' })
        }
        request.user = user
        next()
    })(request, response, next)
}

const checkUserRole = (requiredRoles) => (request, response, next) => {
    if (request.user && requiredRoles.includes(request.user.role)) {
        return next()
    }
    return response.status(403).json({ message: 'Access denied. No permissions.' })
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    auth,
    checkUserRole,
}