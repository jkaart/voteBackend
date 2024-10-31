const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

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
        options: [{ option: 'Talvi', voteCount: 5 }, { option: 'Kevät', voteCount: 5 }, { option: 'Kesä', voteCount: 10 }, { option: 'Syksy', voteCount: 0 }],
    },

]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/votes', (request, response) => {
    response.json(votes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})