const { auth, checkUserRole } = require('../utils/middleware')
const votesRouter = require('express').Router()
const mongoose = require('mongoose')
const Vote = require('../models/vote')
const VoteOption = require('../models/vote')
const { request, response } = require('express')
const { error } = require('../utils/logger')

votesRouter.get('/', async (request, response) => {
    const votes = await Vote.find({})
    if (votes) {
        return response.json(votes)
    }
})

votesRouter.get('/:id', auth, checkUserRole(['user']), async (request, response) => {
    const id = request.params.id
    Vote.find(vote => vote.id === id)
        .then(vote => {
            response.json(vote)
        })
        .then(error => {
            error.status(404).json({ error: 'Vote not found' })
        })
})

votesRouter.post('/', auth, checkUserRole(['admin']), async (request, response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({
            message: 'Title missing'
        })
    }
    if (body.options.length < 2) {
        return response.status(400).json({
            message: 'Need 2 or more options'
        })
    }
    const options = []
    for (const option of body.options) {
        if (option === '') {
            return response.status(400).json({
                message: 'Empty option'
            })
        }
        const voteOption = {
            option: option,
            voteCount: 0,
        }
        console.log(voteOption)
        options.push(voteOption)
    }
    const vote = new Vote({
        title: body.title,
        description: body.description,
        options: options,
    })

    const savedVote = await vote.save()
    console.log(savedVote)

    response
        .status(201)
        .json({ savedVote, message: 'Vote registered successfully' })
})

votesRouter.patch('/voting/:id', auth, checkUserRole(['user', 'admin']), async (request, response) => {
    const voteId = request.params.id
    const { voteOptionId } = request.body

    if (!voteOptionId) {
        response.status(422).json({ error: 'voteOptionId missing' })
    }

    const result = await Vote.findById(voteId)

    if (!result) {
        return response.status(404).json({ error: 'Vote not found' })
    }
    const option = result.options.id(voteOptionId)

    if (!option) {
        return response.status(404).json({ error: 'Vote option not found' })
    }

    option.voteCount += 1
    await result.save()

    console.log(result)

    return response.status(200).json({ voteOptionId: voteOptionId, voteCount: option.voteCount, message: 'Vote registered successfully!' })
})

module.exports = votesRouter