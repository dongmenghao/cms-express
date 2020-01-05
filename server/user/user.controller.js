const User = require('./user.model');
const chalk = require('chalk');

/**
 * load user and append to req
 */
function load(req, res, next, id) { 
  User.findByUserName(id)
    .then(user => {
      if (user.length == 0) { 
        console.error(chalk.red('find no user in findByUserName'));
        return next('no user');
      }
      req.user = user[0];
      return next();
    })
    .catch((err) => { next(err) });
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) { 
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user
 * @property {password} req.body.password - The password of user
 * @returns {User}
 */
function create(req, res, next) { 
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch((err) => next(err));
}

/**
 * Update exist user
 * @property {string} req.body.username - The username of user
 * @property {password} req.body.password - The password of user
 * @returns {User}
 */
function update(req, res, next) { 
  const user = req.user;
  user.username = req.body.username;
  console.log(user);
  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(err => next(err));
}

/**
 * Get user list
 * @property {number} req.query.skip - Number of users to be skipped
 * @property {number} res.query.limit - Limit number of users to be returned 
 * @returns {User[]} 
 */
function list(req, res, list) { 
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch((err) => next(err));
}

/**
 * Delete user
 */
function remove (req, res, next) { 
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch((err) => next(err));
}

module.exports = { load, get, create, update, list, remove };
