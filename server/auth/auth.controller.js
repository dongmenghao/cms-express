const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../config/config');
const User = require('../user/user.model');
const chalk = require('chalk');


function login(req, res, next) { 
  let reqUserName = req.body.username;
  let reqPassword = req.body.password;
  console.log('dmh login', reqUserName, reqPassword);
  User.findByUserName(reqUserName)
    .then((user) => {
      if (user == null) { 
        const error = new APIError('Not find user', httpStatus.NOT_FOUND, true);
        return res.status(error.status).send(error.message);
      }
      if (user.password === user.encryptPassword(reqPassword)) {
        console.log(chalk.green(`${user.username} login success`));
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
          expiresIn: 60 * 60 * 24  // 单位为 s 秒
        });
        return res.json({
          auth: true,
          token,
          username: user.username,
          avatar: user.avatar,
        });
      }
      else {
        return res.status(200).send({auth: false, message: '密码错误'});
      }
    })
}

module.exports = { login };