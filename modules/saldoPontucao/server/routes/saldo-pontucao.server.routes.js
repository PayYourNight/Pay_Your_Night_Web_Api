'use strict';
var saldo = require('../controllers/saldo-pontucao.server.controller');

module.exports = function(app) {
  app.route('/api/saldo')
    .post(saldo.create);

  app.route('/api/saldo')
    .get(saldo.read);

  app.route('/api/saldos')
    .get(saldo.list);
};
