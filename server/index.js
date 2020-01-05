'use strict'

const mongoose = require('mongoose')
const chalk = require('chalk')
const db = require('./db')
const app = require('./config/express')
const config = require('./config/config')

Promise = require('bluebird')
mongoose.Promise = Promise

app.listen(config.port, () => {
  console.log(
    chalk.green(`server started on port: ${config.port} (${config.env})`)
  )
})

module.exports = app