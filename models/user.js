const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    votedVotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote'
        }
    ],
})

userSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._id
        delete returnedObject._passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User