'user strict'

const joi = require('joi')

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8000,
  url: 'mongodb://localhost:27017/cms-express',
  env: process.env.NODE_ENV || 'development'
}
