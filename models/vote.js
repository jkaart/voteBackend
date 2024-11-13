const mongoose = require('mongoose')

const voteOptionSchema = mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        require: true,
        default: 0,
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
    voteCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    voteCreated: { type: Date, default: Date.now }
})

voteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.__v
    }
})

voteOptionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.__v
    }
})

const Vote = mongoose.model('Vote', voteSchema)
const VoteOption = mongoose.model('VoteOption', voteOptionSchema)

module.exports = Vote, VoteOption