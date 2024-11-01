const votesRouter = require('express').Router()

const generateId = () => {
    const maxId = votes.length > 0
        ? Math.max(...votes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

let votes = [
    {
        id: '0',
        title: 'Liha vai kasvis',
        description: 'Kumpi on parempaa?',
        options: [{ option: 'Liha', voteCount: 0 }, { option: 'Kasvis', voteCount: 0 }],
    },
    {
        id: '1',
        title: 'Vuoden aika',
        description: 'Mikä on paras vuoden aika?',
        options: [{ option: 'Talvi', voteCount: 0 }, { option: 'Kevät', voteCount: 5 }, { option: 'Kesä', voteCount: 10 }, { option: 'Syksy', voteCount: 0 }],
    },

]

votesRouter.get('/', async (request, response) => {
    response.json(votes)
})

votesRouter.post('/', async (request, response) => {
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
    const options = [];
    for (const option of body.options) {
        if (option === '') {
            return response.status(400).json({
                message: 'Empty option'
            })
        }
        options.push({ option: option, voteCount: 0 })
    }
    const vote = {
        title: body.title,
        description: body.description,
        options: options,
        id: generateId(),
    }
    console.log(vote)
    votes = votes.concat(vote)
    return response.status(201).json({
        message: 'Vote registered successfully'
    })
})


module.exports = votesRouter