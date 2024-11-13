const mongoose = require('mongoose')

const userVotesSchema = mongoose.Schema({
    voteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    },
    voteOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VoteOption'
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    },
    votedVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    createdVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userVotesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.__v
    }
})

const User = mongoose.model('User', userSchema)
const UserVotes = mongoose.model('UserVotes', userVotesSchema)

module.exports = User, UserVotes