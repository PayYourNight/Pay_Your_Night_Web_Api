'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  Produto = mongoose.model('Produto');

var estabelecimento,
  produto;

describe('Produto Model Unit Tests:', function() {
  beforeEach(function(done) {

    estabelecimento = new Estabelecimento({
      nome: 'estabelecimento 1',
      cnpj: '12345678901213'
    });

    estabelecimento.save()
    .then(function() {
      produto = new Produto({
        estabelecimento: estabelecimento,
        descricao: 'Heineken 600',
        valor: 10
      });

      done();
    })
    .catch(done);
  });

  describe('Método Salvar', function() {
    it('Deve ser capaz de salvar sem problemas', function(done) {
      produto.save(function(err) {
        should.not.exist(err);
        return done();
      });
    });
  });

  afterEach(function(done) {
    Produto.remove().exec()
    .then(Estabelecimento.remove().exec())
    .then(done())
    .catch(done);
  });
});
