const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogRouter.get('/', (request, response,next) => {
    Blog
      .find({}).populate('users')
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error=>next(error))
  })
  
  blogRouter.post('/', (request, response,next) => {
    if (request.token === null) {
      response.status(401).json({error: "no valid token"})
    }
    else {
      if (!request.user) {
        return response.status(401).json({error:'token invalid'})
      }
      else {
        const blog = new Blog({
          title: request.body.title, 
          author: request.body.author,
          url: request.body.url,
          likes: request.body.likes, 
          users: request.user.id.toString()
        })
      
        blog
          .save()
          .then(result => {
            response.status(201).json(result)
          })
          .catch(error=>next(error))
      }
    }
  })

  blogRouter.delete('/:id', async (request,response,next) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    let result = null
    try {
      if (blog.users.toString()!==request.user.id.toString()) {
        response.status(401).json({error: 'not authorized to execute operation'})
      }
      else {
        try {
          result = await Blog.findByIdAndDelete(id)
          if (result) {
            response.status(204).end()
          }
          else {
            response.status(404).end()
          }
        }
        catch(error) {
          next(error)
        }
      }
    }
    catch(error) {
      next(error)
    } 
  })

  blogRouter.put('/:id', (request,response,next) => {
    const id = request.params.id

    const blog = {
      url: request.body.url,
      title: request.body.title,
      author: request.body.author,
      likes: request.body.likes,
      user: request.body.user
    }

    Blog.findByIdAndUpdate(id,blog,{new:true,runValidators:true,context:'query'})
    .then(result=>{response.json(result)})
    .catch(error=>next(error))

    })
  

module.exports = blogRouter