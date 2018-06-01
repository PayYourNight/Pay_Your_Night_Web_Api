'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
<<<<<<< HEAD
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User'),
    jwt = require('jsonwebtoken');
=======
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User'),
  jwt = require('jsonwebtoken');
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe

var secret = 'keepitquiet';

module.exports = function () {
    // Use local strategy
<<<<<<< HEAD
    passport.use('local-token', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }

                var tokenPayload = {
                    username: user.username,
                    loginExpires: user.loginExpires
                };

                // add token and exp date to user object
                user.loginToken = jwt.sign(tokenPayload, secret);
                user.loginExpires = Date.now() + (2 * 60 * 60 * 1000); // 2 hours

                // save user object to update database
                user.save(function (err) {
                    if (err) {
                        done(err);
                    } else {
                        done(null, user);
                    }
                });

            });
=======
  passport.use('local-token', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
        function (username, password, done) {
          User.findOne({
            username: username
          }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, {
                message: 'Unknown user'
              });
            }
            if (!user.authenticate(password)) {
              return done(null, false, {
                message: 'Invalid password'
              });
            }

            var tokenPayload = {
              username: user.username,
              loginExpires: user.loginExpires
            };

            // add token and exp date to user object
            user.loginToken = jwt.sign(tokenPayload, secret);
            user.loginExpires = Date.now() + (2 * 60 * 60 * 1000); // 2 hours

            // save user object to update database
            user.save(function (err) {
              if (err) {
                done(err);
              } else {
                done(null, user);
              }
            });

          });
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe
        }
    ));
};
