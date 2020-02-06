const Category = require('./category.model');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createCategory(req, res, next) { 
  const model = req.body;
  
  if (!model.name) { 
    const err = new APIError('name is null', httpStatus["422_NAME"]);
    return Promise.reject(err);
  }
  Category.findOneAsync({ name: model.name })
    .then(function (category) {
      if (category)
        return Promise.reject(new APIError(`name ${model.name} is alreay exist.`, httpStatus["403_MESSAGE"]));
      else {
        const category = new Category(model);
        console.log('create category:' + model.name);
        category.save()
          .then(savedCategory => res.json(savedCategory))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
}

function getCategoryList(req, res, next) {
  const name = req.query.name;
  if (name) {
    Category.find({ name: name }).populate('parent')
      .then(result => res.json(result))
      .catch(err => next(err));
  } else { 
    Category.find().populate('parent')
    .exec()
    .then(data => res.json(data));
  }
  
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
  console.log('update category:' + req.body.name);
  Category.findByIdAndUpdateAsync(id, req.body, {new: true})
    .then(result => {
      console.log('update success');
      res.json(result);
    })
    .catch((err) => { 
      console.log('update error:' + err);
      // TODO 修改name 同名时出错，E11000 duplicate key error collection
      next(err);
    });
}

function deleteCategory(req, res, next) { 
  var id = req.params.id;
  Category.findByIdAndRemoveAsync(id)
    .then(result => res.json(result))
    .catch((err) => next(err));
}

module.exports = { createCategory, getCategoryList, findCategoryById, updateCategory, deleteCategory };