const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  return res.json('hello world')
})

router.get('/*', function(req, res, next) {
  return res.json({status: '404', data: '无效路径'})
})

module.exports = router