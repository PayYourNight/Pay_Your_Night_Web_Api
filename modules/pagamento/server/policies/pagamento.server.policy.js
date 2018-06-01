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
      resources: '/api/pagamentos',
      permissions: ['get']
    }, {
      resources: '/api/pagamentos/:pagamentoId',
      permissions: '*'
    }]
  }, {
    roles: ['admimEst'],
    allows: [{
      resources: '/api/pagamentos',
      permissions: ['get']
    }, {
      resources: '/api/pagamentos/:pagamentoId',
      permissions: ['get']
    }]
<<<<<<< HEAD
    }, {
      roles: ['user'],
      allows: [{
        resources: '/api/pagamentos',
        permissions: ['get', 'post']
      }, {
        resources: '/api/pagamentos/:pagamentoId',
        permissions: ['get']
      }]
=======
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/pagamentos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/pagamentos/:pagamentoId',
      permissions: ['get']
    }]
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe
  }, {
    roles: ['caixa'],
    allows: [{
      resources: '/api/pagamentos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/pagamentos/:pagamentoId',
      permissions: ['get']
    }]
  }]);
};

exports.isAllowed = function (req, res, next) {
<<<<<<< HEAD
  //var roles = (req.user) ? req.user.roles : ['guest'];

  // If an article is being processed and the current user created it then allow any manipulation
  //if (req.article && req.user && req.article.user && req.article.user.id === req.user.id) {
    //return next();
  //}
=======
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an article is being processed and the current user created it then allow any manipulation
  if (req.article && req.user && req.article.user && req.article.user.id === req.user.id) {
    return next();
  }
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe

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
