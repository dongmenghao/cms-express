const express = require('express');
const validate = require('express-validation');
const categoryCtrl = require('./category.controller');

const router = express.Router();

router.route('/')
  /** Get /api/category  Get list of category */
  .get(categoryCtrl.getCategoryList)
  /** Post /api/categpry create category */
  .post(categoryCtrl.createCategory);

router.route('/:id')
  /** Get /api/category/:id  - Get category */
  .get(categoryCtrl.findCategoryById)
  /** Put /api/category/:id - Update category */
  .put(categoryCtrl.updateCategory)
  /** Delete /api/category/:id - Delete category */
  .delete(categoryCtrl.deleteCategory);

module.exports = router;


