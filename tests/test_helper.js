const Vote = require('../models/vote')
const initialVotes = [
    {
        title: 'Init 1',
        description: 'Init 1 vote description',
        options: ['Vote 1', 'Vote 2']
    },
    {
        title: 'Init 2',
        description: 'Init 2 vote description',
        options: ['Vote A', 'Vote B']
    }
]

const nonExistingId = async () => {
    const voteOptions = [{ option: 'A', voteCount: 0 },{ option: 'B', voteCount: 0 }]
    const vote = new Vote({ title: 'Non Existing', description: 'Non exiting id', options: [voteOptions] })
    await vote.save()
    await vote.deleteOne()

    return vote._id.toString()
}

const votesInDb = async () => {
    const votes = await Vote.find({})
    return votes.map(vote => vote.toJSON())
}

module.exports = {
    initialVotes, nonExistingId, votesInDb
}