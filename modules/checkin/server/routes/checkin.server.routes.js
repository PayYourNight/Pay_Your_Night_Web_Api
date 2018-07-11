'use strict';

var checkinPolicy = require('../policies/checkin.server.policy'),
  checkin = require('../controllers/checkin.server.controller'),
  authorization = require('../../../users/server/controllers/users/users.authorization.server.controller'); //"\users\server\controllers\users\users.authorization.server.controller.js"

module.exports = function (app) {
  app.route('/api/checkin')//.all(authorization.requiresLoginToken) // .all(checkinPolicy.isAllowed)
    .get(checkin.list)    
    .post(checkin.create);

  app.route("/api/checkin/ativo")
    .get(checkin.getAtivo);

  app.route("/api/checkin/confirmacao")
    .get(checkin.getAguardandoConfirmacao);   

  app.route('/api/checkin/:checkinId') // .all(checkinPolicy.isAllowed)
  .get(checkin.read);

  app.param('checkinId', checkin.checkinByID);

};
