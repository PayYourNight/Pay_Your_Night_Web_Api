'use strict';

var consumo = require('../controllers/consumo.server.controller');

module.exports = function (app) {
  app.route('/api/consumo/add')
  .post(consumo.add);

  // app.route('/api/consumo') // .all(checkinPolicy.isAllowed)
  // .get(consumo.list)
  // .post(consumo.create);

  // app.route('/api/consumo/:consumoId') // .all(checkinPolicy.isAllowed)
  // .get(consumo.read);

  // app.param('consumoId', consumo.consumoByID);

};
