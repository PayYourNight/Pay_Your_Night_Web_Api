'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller'),  
  users = require(path.resolve("./modules/users/server/controllers/users/users.authorization.server.controller.js"));

module.exports = function (app) {

  //app.use(users.requiresLoginToken);

  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
      .post(users.requiresLoginToken, articles.create);

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};
