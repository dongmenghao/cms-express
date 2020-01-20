const User = require('../user/user.model');
const Category = require('../category/category.model');
const Article = require('./article.model')
const chalk = require('chalk');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');

function load(req, res, next, id) { 
  Article.get(id)
    .then(article => {
      console.log('load ', article);
      req.article = article;
      return next();
    })
}

/**
 * 
 * Get article
 * @returns {Article}
 */
function get(req, res) { 
  return res.json(req.article);
}

function create(req, res, next) {
  console.log(`${req.body}`);
  if (!req.body.category) { 
    next(new APIError('category is null', httpStatus.NOT_FOUND));
  }
  Category.findOne({ name: req.body.category })
    .then(category => {
      console.log(category);
      const article = new Article({
        title: req.body.title,
        content: req.body.content,
        category: category._id
      })
    
      article.save()
        .then(article => {
          res.json(article)
        })
        .catch((err) => next(err));
    })
    .catch(err => { 
      next(new APIError(`No Category,${err}`, httpStatus.NOT_FOUND));
    })
  
}

function update(req, res, next) { 
  const user = req.article;
  article.title = req.body.title;
  article.content = req.body.content;

  article.save()
    .then(savedArticle => res.json(savedArticle))
    .catch(err => next(err));
}

function list(req, res, list) { 
  const { limit = 50, skip = 0 } = req.query;
  Article.list({ limit, skip })
    .then(aritlces => res.json(aritlces))
    .catch((err) => next(err));
}

/**
 * Delete article
 */
function remove (req, res, next) { 
  const article = req.article;
  article.remove()
    .then(deletedArticle => res.json(deletedArticle))
    .catch((err) => next(err));
}

module.exports = { load, get, create, update, list, remove };