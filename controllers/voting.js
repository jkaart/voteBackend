const { auth, checkUserRole } = require('../utils/middleware')
const votingRouter = require('express').Router()
const Vote = require('../models/vote')
const User = require('../models/user')

// Voting a single vote
votingRouter.patch('/:id', auth, checkUserRole(['user', 'admin']), async (request, response) => {
    const voteId = request.params.id
    const user = request.user

    // Check if user is already voted this vote:
    const exists = await User.findOne({ _id: user.id, votedVotes: { $in: [voteId] } })
    if (exists) {
        return response.status(405).json({ error: 'This user have already voted this' })
    }

    const { voteOptionId } = request.body
    if (!voteOptionId) {
        return response.status(422).json({ error: 'voteOptionId missing' })
    }

    const vote = await Vote.findById(voteId)
    if (!vote) {
        return response.status(404).json({ error: 'Vote not found' })
    }

    const option = vote.options.id(voteOptionId)
    if (!option) {
        response.status(404).json({ error: 'Vote option not found' })
    }

    // Make actual vote
    option.voteCount += 1

    // Link user and vote together and save to the database
    Vote.votedUsers = vote.votedUsers.concat(user._id)
    const savedVote = await vote.save()
    user.votedVotes = user.votedVotes.concat(savedVote._id)
    await user.save()

    return response.status(200).json({ voteOptionId: voteOptionId, voteCount: option.voteCount, message: 'Vote registered successfully!' })
})

module.exports = votingRouter