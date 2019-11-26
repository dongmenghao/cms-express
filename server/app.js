'use strict'

const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const db = require('./db')
const config = require('./config/index.js')
const router = require('./router/index.js')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const app = express()
app.all('*', (req, res, next) => {
  //console.log('req: ' + req.url)
  // if(req.method == 'OPTIONS') {
  //   res.sendStatus(200)
  // } else {
  //   next()
  // }
  next()
})

app.use(router)
// app.use(express.static('./public'))
app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口: ${config.port}`)
  )
})
