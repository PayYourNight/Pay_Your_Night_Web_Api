'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy,
  User = require('mongoose').model('User');

module.exports = function () {
  passport.use('bearer', new BearerStrategy(
    function (token, done) {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));
};
