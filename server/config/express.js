const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const httpStatus = require('http-status')
const cors = require('cors')
const config = require('./config')
const routers = require('../index.route')

const app = express()
if (config.env === 'development') { 
  // TODO
}

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS -Cross Origin Resource Sharing
app.use(cors())

// mount all routes on /api path
app.use('/api', routers)


// error handler, send stacktrace only during development
app.use((err, req, res, next) => 
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
)

module.exports = app