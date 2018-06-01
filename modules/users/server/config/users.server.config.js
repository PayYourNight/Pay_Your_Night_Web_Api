'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    User = require('mongoose').model('User'),
    path = require('path'),
    config = require(path.resolve('./config/config'));

module.exports = function (app, db) {
<<<<<<< HEAD
    // Serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
=======
  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe

    // Deserialize sessions
    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, '-salt -password', function (err, user) {
            done(err, user);
        });
    });

    // Initialize strategies
    config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function (strategy) {
        require(path.resolve(strategy))(config);
    });

    // Add passport's middleware
    app.use(passport.initialize());
    app.use(passport.session());
};
