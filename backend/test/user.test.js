const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

const users = [
    {name: "stan", username:"lee", password: "pray"}
]
beforeEach(async () => {
    await User.deleteMany({})
    const obj = users.map(user => new User({
        name: user.name,
        username: user.username, 
        password: bcrypt.hash(user.password,10)
    }))
    const promises = obj.map(promise=>promise.save())
    await Promise.all(promises)
})

describe('check if incorrect user entry causes error', ()=> {
    test('check if username/password with length < 3 causes validation error', async ()=> {
        const user = {name: "p", username: "ee", password: "oeow"}
        const response = await api.post('/api/users').send(user).expect(400)
        const user2 = {name: "p", username: "eee", password: "ow"}
        const response2 = await api.post('/api/users').send(user).expect(400)
    })
})