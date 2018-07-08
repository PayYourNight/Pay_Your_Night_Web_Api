'use strict';

/**
 * Module dependencies
 */
var checkoutsPolicy = require('../policies/checkouts.server.policy'),
  checkouts = require('../controllers/checkouts.server.controller');

module.exports = function(app) {
  // Checkouts Routes
  app.route('/api/checkouts')//.all(checkoutsPolicy.isAllowed)
    .get(checkouts.list)
    .post(checkouts.create);

  app.route('/api/checkouts/:checkoutId')//.all(checkoutsPolicy.isAllowed)
    .get(checkouts.read)
    .put(checkouts.update)
    .delete(checkouts.delete);

  // Finish by binding the Checkout middleware
  app.param('checkoutId', checkouts.checkoutByID);
};
