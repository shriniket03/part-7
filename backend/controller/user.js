const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request,response,next) => {
    const content = await request.body
    if (content.password.length < 3) {
        response.status(400).json({error:'Password length should be at least 3 characters'})
    }
    else {
        const hash = await bcrypt.hash(content.password,10)
        newUser = new User({
            username: content.username,
            name: content.name,
            passwordHash: hash
        })
        newUser.save().then(result=>{
            response.status(201).json(result)
        }).catch(error => next(error))
    }
})

userRouter.get('/', (request,response,next) => {
    User.find({}).then(result => {
        response.json(result)
    }).catch(error => next(error))
})

module.exports = userRouter