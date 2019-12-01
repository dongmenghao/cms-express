'user strict'

const joi = require('joi')
console.log(a)
var a = 10


module.exports = {
  port: parseInt(process.env.PORT, 10) || 8000,
  url: 'mongodb://localhost:27017/cms-express',
}