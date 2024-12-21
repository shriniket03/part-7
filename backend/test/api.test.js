const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const {initArray,finder} = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
    await User.deleteMany({})
    const hash = await bcrypt.hash('pray',10)
    const user1 = {name: 'stan', username: 'leer', passwordHash: hash }
    const testUser = new User(user1)
    await testUser.save()

    const res = await User.findOne({username: user1.username})
    await Blog.deleteMany({})
    const objects = initArray.map(item => new Blog({
        title: item.title,
        author: item.author,
        url: item.url,
        likes: item.likes, 
        users: res._id
    }))
    const promises = objects.map(x=>x.save())
    await Promise.all(promises)
})

describe('Exercises 4.8-4.12', ()=> {
    test('check if all are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
    
    test('check that id is defined',async ()=> {
        const response = await api.get('/api/blogs')
        const content = await response.body
        const keys = Object.keys(content[0])
        assert(keys.includes('id'))
        assert.strictEqual(keys.includes('_id'),false)
    })

    test('check that POST works', async () => {
        const bef = await api.get('/api/blogs')
        const befCont = await bef.body
        
        const login = {username:'leer', password:'pray'}
        const token = await api.post('/api/login').send(login).expect(200)

        const entry = {title:"Pirate", author:"James Bond", url:"google.com.sg", likes:10}
        const response = await api.post('/api/blogs').send(entry).set({Authorization: 'Bearer ' + token.body.token}).expect(201).expect('Content-Type', /application\/json/)

        const all = await api.get('/api/blogs')
        const content = await all.body
        assert.strictEqual(content.length,befCont.length+1)
    })

    test('check that likes default to 0', async () => {
        const entry = {title:"Pirate", author:"James Bond", url:"google.com.sg"}
        const login = {username:'leer', password:'pray'}
        const token = await api.post('/api/login').send(login).expect(200)

        const response = await api.post('/api/blogs').send(entry).set({Authorization: 'Bearer ' + token.body.token}).expect(201).expect('Content-Type', /application\/json/)
        
        const all = await response.body
        assert.strictEqual(all.likes,0)
    })

    test('check that missing URL/Title gives a 400 error', async () => {
        const entry = {title:"Pirate", author:"James Bond"}
        const login = {username:'leer', password:'pray'}
        const token = await api.post('/api/login').send(login).expect(200)

        const response = await api.post('/api/blogs').send(entry).set({Authorization: 'Bearer ' + token.body.token}).expect(400)

        const entry2 = {author:"James Bond", url:"gogole.com.sg"}

        const response2 = await api.post('/api/blogs').send(entry2).set({Authorization: 'Bearer ' + token.body.token}).expect(400)
    })

})

describe('Exercises 4.13-4.14', async () => {
    test('Check that DELETE works', async ()=> {
        const login = {username:'leer', password:'pray'}
        const token = await api.post('/api/login').send(login).expect(200)

        const response = await api.get('/api/blogs')
        const content = await response.body
        const befElem = content[0]
        assert(content.includes(befElem))

        const response2 = await api.delete(`/api/blogs/${befElem.id}`).set({Authorization: 'Bearer ' + token.body.token}).expect(204)
        const response3 = await api.get('/api/blogs')
        const content2 = await response3.body
        assert(!content2.includes(befElem))
    })

    test('Check that UPDATE works', async ()=> {
        const response = await api.get('/api/blogs')
        const content = await response.body
        const befElem = content[0]

        const elem = {
            url: befElem.url,
            author: befElem.author, 
            title: befElem.title,
            likes: 123148980
        }

        const response2 = await api.put(`/api/blogs/${befElem.id}`).send(elem)
        const content2 = await response2.body
        assert.notDeepEqual(content2.likes,befElem.likes)
        assert.deepEqual(content2.author,befElem.author)
        assert.deepEqual(content2.title,befElem.title)
        assert.deepEqual(content2.id,befElem.id)
        assert.deepEqual(content2.url,befElem.url)
    })
})






