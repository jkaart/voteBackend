const mongoose = require('mongoose')
const VoteOption = require('./vote')

const userVotesSchema = mongoose.Schema({
    voteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    },
    voteOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: VoteOption
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    role: String,
    votedVotes: [],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

userVotesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._id
    }
})

const User = mongoose.model('User', userSchema)
const UserVotes = mongoose.model('UserVotes', userVotesSchema)

module.exports = User, UserVotes