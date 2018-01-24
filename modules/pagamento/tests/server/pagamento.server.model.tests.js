'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario'),
  Pagamento = mongoose.model('Pagamento'),
  Estabelecimento = mongoose.model('Estabeleciento'),
  MeioPagamento = mongoose.model('MeioPagamento'),
  Produto = mongoose.model('Produto'),
  Consumo = mongoose.model('Consumo');


/**
 * Globals
 */
var usuario,
  usuarioCaixa,
  estabelecimento,
  consumo,
  meioPagamento,
  pagamento;

/**
 * Unit tests
 */
describe('Pagamento Model Unit Tests:', function () {
  beforeEach(function (done) {
    usuario = new Usuario({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    estabelecimento = new Estabelecimento({

    });

    usuario.save(function () {
      pagamento = new Pagamento({

      });
      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      return pagamento.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Pagamento.remove().exec();
    Usuario.remove().exec();

    done();
  });
});
