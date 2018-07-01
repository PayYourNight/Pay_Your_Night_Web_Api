'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Memoriacalculo = mongoose.model('Memoriacalculo');

/**
 * Globals
 */
var user,
  memoriacalculo;

/**
 * Unit tests
 */
describe('Memoriacalculo Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      memoriacalculo = new Memoriacalculo({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return memoriacalculo.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Memoriacalculo.remove().exec();
    User.remove().exec();

    done();
  });
});
