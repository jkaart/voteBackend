const { auth, checkUserRole } = require('../utils/middleware')
const voteRouter = require('express').Router()
const Vote = require('../models/vote')

// Get a single vote
voteRouter.get('/:id', auth, checkUserRole(['user', 'admin']), async (request, response) => {
    const id = request.params.id
    const vote = await Vote.findOne({ '_id': id }).populate({ path: 'voteCreator', select: 'username' }).populate({ path: 'votedUsers', select: 'username' })
    if (!vote) {
        return response.status(404).json({ error: 'Vote not found' })
    }
    response.json(vote)
})

//Post a new vote
voteRouter.post('/', auth, checkUserRole(['admin']), async (request, response) => {
    const { title, options, description } = request.body
    const user = request.user

    if (!title) {
        return response.status(400).json({
            message: 'Title missing'
        })
    }
    if (options.length < 2) {
        return response.status(400).json({
            message: 'Need 2 or more options'
        })
    }
    const parsedOptions = []
    for (const option of options) {
        if (option === '') {
            return response.status(400).json({
                message: 'Empty option'
            })
        }
        const voteOption = {
            option: option,
        }
        parsedOptions.push(voteOption)
    }
    const vote = new Vote({
        title: title,
        description: description,
        options: parsedOptions,
        voteCreator: user.id
    })

    const savedVote = await vote.save()
    user.createdVotes = user.createdVotes.concat(savedVote._id)

    await user.save()

    return response
        .status(201)
        .json({ savedVote, message: 'Vote registered successfully' })
})

voteRouter.delete('/:id', auth, checkUserRole(['admin']), async (request, response) => {
    const voteId = request.params.id

    const deletedVote = await Vote.findByIdAndDelete(voteId)
    if (!deletedVote) {
        return response.status(404).end()
    }
    response.status(204).end()
})

module.exports = voteRouter
