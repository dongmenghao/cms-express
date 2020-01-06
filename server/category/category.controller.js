const Category = require('./category.model');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createCategory(req, res, next) { 
  const categoryName = req.body.name;
  if (!categoryName) { 
    const err = new APIError('name is null', httpStatus["422_NAME"]);
    return Promise.reject(err);
  }
  Category.findOneAsync({ name: categoryName })
    .then(function (category) {
      if (category)
        return Promise.reject(new APIError(`name ${categoryName} is alreay exist.`, httpStatus["403_MESSAGE"]));
      else {
        const category = new Category({ name: categoryName });
        category.save()
          .then(savedCategory => res.json(savedCategory))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
}

function getCategoryList(req, res, next) {
  Category.find()
    .exec()
    .then(data => res.json(data));
}

function findCategoryById(req, res, next) { 
  var id = req.params.id;
  Category.findById(id)
    .then(result => res.json(result))
    .catch(err => next(err));
}

function updateCategory(req, res, next) { 
  var id = req.params.id;
  if (req.body._id) delete req.body._id;
  Category.findByIdAndUpdateAsync(id, req.body, {new: true})
    .then(result => {
      res.json(result);
    })
    .catch((err) => next(err));
}

function deleteCategory(req, res, next) { 
  var id = req.params.id;
  Category.findByIdAndRemoveAsync(id)
    .then(result => res.json(result))
    .catch((err) => next(err));
}

module.exports = { createCategory, getCategoryList, findCategoryById, updateCategory, deleteCategory };