'use strict'

const mongoose = require('mongoose')
const config = require('./config/config.js')
const chalk = require('chalk')

console.log(`dmh ${config.mongo.host}`)
mongoose.connect(config.mongo.host, {userMongoClient: true})
mongoose.Promise = global.Promise

const db = mongoose.connection
db.once('open', () => {
  console.log(
    chalk.green('连接数据库成功')
  )
})

db.on('error', function(error) {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  )
  mongoose.disconnect()
})

db.on('close', () => {
  console.log(
    chalk.red('数据库已断开, 重新连接数据库')
  )
  mongoose.connect(config.url, {server: {autoconnect: true}})
})

module.exports = db