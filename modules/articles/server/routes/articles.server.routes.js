'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  articlesPolicy = require('../policies/articles.server.policy'),
<<<<<<< HEAD
  articles = require('../controllers/articles.server.controller'),  
  users = require(path.resolve("./modules/users/server/controllers/users/users.authorization.server.controller.js"));

module.exports = function (app) {

  //app.use(users.requiresLoginToken);

  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
      .post(users.requiresLoginToken, articles.create);
=======
  articles = require('../controllers/articles.server.controller'),
  passport = require('passport');
  // users = require(path.resolve('./modules/users/server/controllers/users/users.authorization.server.controller.js'));


module.exports = function (app) {

  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(passport.authenticate('jwt', { session: false }), articles.list)
    .post(articles.create);
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};
