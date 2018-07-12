'use strict';

var consumo = require('../controllers/consumo.server.controller');

module.exports = function (app) {

  app.route('/api/consumo')
    .post(consumo.create);

  app.route('/api/consumo') // .all(checkinPolicy.isAllowed)
    .get(consumo.list);

  app.route('/api/consumo/historico') // .all(checkinPolicy.isAllowed)
    .get(consumo.getHistorico);

  app.route('/api/consumo/historico/detalhe') // .all(checkinPolicy.isAllowed)
    .get(consumo.getHistoricoDetalhe);

  
  
  // .post(consumo.create);

  // app.route('/api/consumo/:consumoId') // .all(checkinPolicy.isAllowed)
  // .get(consumo.read);

  // app.param('consumoId', consumo.consumoByID);

};
