'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  MeioPagamento = mongoose.model('MeioPagamento');

/**
 * Globals
 */
var user,
  meioPagamento;

/**
 * Unit tests
 */
describe('Meio pagamento Model Unit Tests:', function() {
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
      meioPagamento = new MeioPagamento({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return meioPagamento.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    MeioPagamento.remove().exec();
    User.remove().exec();

    done();
  });
});
