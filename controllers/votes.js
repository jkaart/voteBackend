let votes = require('../data/votes')
const { auth, checkUserRole } = require('../utils/middleware')
const votesRouter = require('express').Router()

const generateId = () => {
  const maxId = votes.length > 0
    ? Math.max(...votes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

votesRouter.get('/', async (request, response) => {
  response.json(votes)
})

votesRouter.get('/:id', auth, checkUserRole('user'), async (request, response) => {
  const id = request.params.id
  const vote = votes.find(vote => vote.id === id)
  if (vote) {
    return response.json(vote)
  }
  response
    .status(404)
    .json({ error: 'Vote not found' })
})

votesRouter.post('/', auth, checkUserRole('admin'), async (request, response) => {
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
    options.push({ option: option, voteCount: 0 })
  }
  const vote = {
    title: body.title,
    description: body.description,
    options: options,
    id: generateId(),
  }
  votes = votes.concat(vote)
  console.log('Votes', votes)

  response
    .status(201)
    .json({ message: 'Vote registered successfully' })
})


module.exports = votesRouter