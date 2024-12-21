const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  let tokens= null
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    tokens = authorization.replace('Bearer ', '')
  }
  request.token = tokens
  next()
}

const userExtractor = async (request,response,next) => {
  if (request.token === null) {
    request.user = null
  }
  else {
    const user = jwt.verify(request.token,process.env.SECRET)
    let x = null
    if (!user.id) {
      request.user = null
    }
    else {
      const x = await User.findById(user.id)
      request.user = x
    }
  }
  next()
}


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })

  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}