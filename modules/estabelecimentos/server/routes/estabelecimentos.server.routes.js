'use strict';

/**
 * Module dependencies
 */
var estabelecimentosPolicy = require('../policies/estabelecimentos.server.policy'),
  estabelecimentos = require('../controllers/estabelecimentos.server.controller');

module.exports = function(app) {
  // Estabelecimentos Routes
  app.route('/api/estabelecimentos').all(estabelecimentosPolicy.isAllowed)
    .get(estabelecimentos.list)
    .post(estabelecimentos.create);

  app.route('/api/estabelecimentos/:estabelecimentoId').all(estabelecimentosPolicy.isAllowed)
    .get(estabelecimentos.read)
    .put(estabelecimentos.update)
    .delete(estabelecimentos.delete);

  // Finish by binding the Estabelecimento middleware
  app.param('estabelecimentoId', estabelecimentos.estabelecimentoByID);
};
