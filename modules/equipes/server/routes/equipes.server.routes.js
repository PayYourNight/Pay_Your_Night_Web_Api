'use strict';

/**
 * Module dependencies
 */
var equipesPolicy = require('../policies/equipes.server.policy'),
  equipes = require('../controllers/equipes.server.controller');

module.exports = function(app) {
  // Equipes Routes
  app.route('/api/equipes').all(equipesPolicy.isAllowed)
    .get(equipes.list)
    .post(equipes.create);

  app.route('/api/equipes/:equipeId').all(equipesPolicy.isAllowed)
    .get(equipes.read)
    .put(equipes.update)
    .delete(equipes.delete);

  // Finish by binding the Equipe middleware
  app.param('equipeId', equipes.equipeByID);
};
