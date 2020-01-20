const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Article Schema
 */
const ArticleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

ArticleSchema.statics = {
  /**
   * Get article
   * @param {ObjectId} id - The objectid of article
   */
  get(id) { 
    return this.findById(id)
      .populate({
        path: 'category',
        select: 'name -_id'
      })
      .exec()
      .then(article => {
        if (article) {
          console.log(`article get ${article.category}`);
          return article;
        }
        const err = new APIError('No such article exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List aritcles in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 10 } = {}) { 
    return this.find()
      .populate('category', 'name -_id')
      .sort({ createAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
}

/**
 * @typedef Article
 */
module.exports = mongoose.model('Article', ArticleSchema);