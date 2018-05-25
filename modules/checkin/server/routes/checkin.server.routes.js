'use strict';

var checkinPolicy = require('../policies/checkin.server.policy'),
  checkin = require('../controllers/checkin.server.controller');

module.exports = function (app) {
  app.route('/api/checkin').all(checkinPolicy.isAllowed)
  .get(checkin.list)
  .post(checkin.create);

  app.route('/api/checkin/:checkinId').all(checkinPolicy.isAllowed)
  .get(checkin.read);

  app.param('checkinId', checkin.checkinByID);

};
