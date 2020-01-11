const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../config/config');
const authCtrl = require('./auth.controller');

const router = new express.Router();

router.route('/login')
  /** Post /api/login - login, return token if success */
  .post(authCtrl.login);

module.exports = router;
