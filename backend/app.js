const config = require('./util/config')
const express = require('express')
const app = express()
const cors = require('cors') 
const middleware = require('./util/middleware')   
const blogRouter = require('./controller/blog') 
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const logger = require('./util/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor) 
app.use(middleware.requestLogger)     

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
  