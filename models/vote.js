const mongoose = require('mongoose')

const voteOptionSchema = mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        require: true
    }
})

const voteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    options: [voteOptionSchema],
    child: voteOptionSchema,

    votedUsers: [],
})

voteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._id
    }
})

const Vote = mongoose.model('Vote', voteSchema)
const VoteOption = mongoose.model('VoteOption', voteOptionSchema)

module.exports = Vote, VoteOption