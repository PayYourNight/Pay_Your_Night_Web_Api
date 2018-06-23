'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  SaldoPontucao = mongoose.model('SaldoPontucao');

/**
 * Globals
 */
var user,
  saldoPontucao;

/**
 * Unit tests
 */
describe('Saldo pontucao Model Unit Tests:', function() {
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
      saldoPontucao = new SaldoPontucao({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return saldoPontucao.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    SaldoPontucao.remove().exec();
    User.remove().exec();

    done();
  });
});
