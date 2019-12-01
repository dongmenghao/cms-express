const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => res.json('hello world'))

router.get('/*', (req, res, next) => res.json({
  status: '404',
  data: '无效路径',
}))

module.exports = router
