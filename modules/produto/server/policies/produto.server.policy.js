'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/produtos',
      permissions: ['get']
    }, {
      resources: '/api/produtos/:pagamentoId',
      permissions: '*'
    }]
  }, {
    roles: ['admimEst'],
    allows: [{
      resources: '/api/produtos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/produtos/:pagamentoId',
      permissions: ['get']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/produtos',
      permissions: ['get']
    }, {
      resources: '/api/produtos/:pagamentoId',
      permissions: ['get']
    }]
  }, {
    roles: ['caixa'],
    allows: [{
      resources: '/api/produtos',
      permissions: ['get']
    }, {
      resources: '/api/produtos/:pagamentoId',
      permissions: ['get']
    }]
  }, {
    roles: ['bar'],
    allows: [{
      resources: '/api/produtos',
      permissions: ['get']
    }, {
      resources: '/api/produtos/:pagamentoId',
      permissions: ['get']
    }]
  }]);
};

exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

//     if (req.article && req.user && req.produto.user && req.produto.user.id === req.user.id) {
//     return next();
//   }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
