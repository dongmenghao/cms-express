const Promise = require('bluebird');
const mongoose = require('mongoose');

/**
 * Category Schema
 */
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  isShow: {
    type: Boolean,
    default: true,
  },
  isMenu: {
    type: Boolean,
    default: false,
  }
});

const Category = mongoose.model('Category', CategorySchema);
Promise.promisifyAll(Category);
Promise.promisifyAll(Category.prototype);

module.exports = Category;



