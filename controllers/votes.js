const votesRouter = require('express').Router()
const Vote = require('../models/vote')
const { auth, checkUserRole } = require('../utils/middleware')

// Get all votes
votesRouter.get('/', async (request, response) => {
    const votes = await Vote.find({}).populate('voteCreator').populate('votedUsers')
    console.log(votes)
    if (votes.length > 0) {
        return response.json(votes)
    }
    response.status(404).json(votes)
})

votesRouter.delete('/', auth, checkUserRole(['admin']), async (request, response) => {

    const result = await Vote.deleteMany({})
    if (!result) {
        return response.status(404).end()
    }
    response.status(204).end()
})

module.exports = votesRouter