const express = require('express');
const validate = require('express-validation');
const articleCtrl = require('./article.controller');

const router = express.Router();

router.route('/')
  /** GET /api/articles - Get list of articles */
  .get(articleCtrl.list)

  /** POST /api/articles - Create new article */
  .post(articleCtrl.create);

router.route('/:articleId')
  /** GET /api/articles/:articleId - Get article */
  .get(articleCtrl.get)

  /** PUT /api/articles/:articleId - Update article */
  .put(articleCtrl.update)

  /** DELETE /api/articles/:articleId - Delete article */
  .delete(articleCtrl.remove);

/** Load article when API with articleId route parameter is hit */
router.param('articleId', articleCtrl.load);

module.exports = router;