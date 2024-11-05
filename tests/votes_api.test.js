const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Vote = require('../models/vote')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const newTestUser = {
    username: 'user',
    password: 'TestPw_1234',
    role: 'user',
}

const testAdmin = {
    username: 'admin',
    password: 'TestiAdmin1234!',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWQiOiI2NzI5MzY0ZTEyZWM5YmQyOTM5M2ZmMDYiLCJpYXQiOjE3MzA3NjIwMTd9.blbueeWoWyK0NMNIzaEcWaHJrSNw_PE-z-7JVN8_X8Q',
    role: 'admin'
}

beforeEach(async () => {
    await User.deleteOne({ username: 'user' })
    await Vote.deleteMany({})
    await Vote.insertMany(helper.initialVotes)
})

test('Votes are returned as json', async () => {
    await api
        .get('/api/votes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('There are two votes', async () => {
    const response = await api.get('/api/votes')
    assert.strictEqual(response.body.length, 2)
})

test('New user register', async () => {
    await api
        .post('/api/users')
        .send(newTestUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

test('User login', async () => {
    await api
        .post('/api/users')
        .send(newTestUser)
        .expect(201)
    await api
        .post('/api/login')
        .send({ username: newTestUser.username, password: newTestUser.password })
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Create new vote with 2 options', async () => {
    const newVote = {
        title: 'Test vote 50',
        description: 'This is first test vote',
        options: ['Option 1', 'Option 2']
    }
    await api
        .post('/api/votes')
        .auth(testAdmin.token, { type: 'bearer' })
        .send(newVote)
        .expect(201)
})

test('Create new vote with 1 options', async () => {
    const newVote = {
        title: 'Test vote 3',
        description: 'This is first test vote',
        options: ['Option 1']
    }
    await api
        .post('/api/votes')
        .auth(testAdmin.token, { type: 'bearer' })
        .send(newVote)
        .expect(400)
        .expect({ message: 'Need 2 or more options' })
})

after(async () => {
    await mongoose.connection.close()
})