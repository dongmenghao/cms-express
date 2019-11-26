'user strict'

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8000,
  url: 'mongodb://localhost:27017/cms-express',
}