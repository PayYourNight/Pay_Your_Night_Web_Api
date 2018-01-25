'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  ProdutoConsumo = mongoose.model('ProdutoConsumo');

/**
 * Globals
 */
var user,
  produtoConsumo;

/**
 * Unit tests
 */
describe('Produto consumo Model Unit Tests:', function() {
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
      produtoConsumo = new ProdutoConsumo({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return produtoConsumo.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    ProdutoConsumo.remove().exec();
    User.remove().exec();

    done();
  });
});
