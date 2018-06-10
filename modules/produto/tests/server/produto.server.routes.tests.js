'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  express = require(path.resolve('./config/lib/express')),
  User = mongoose.model('User'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  Produto = mongoose.model('Produto');

var app,
  agent,
  credentials,
  user,
  estabelecimento,
  produto;

describe('Produto Server Routes tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose.connection.db);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    estabelecimento = new Estabelecimento({
      nome: 'Empresa01',
      cnpj: '1234566789101112'
    });

    user.save()
      .then(function () {
        produto = new Produto({
          descricao: 'Heineken 600',
          estabelecimento: estabelecimento,
          valor: 10
        });

        produto.save()
        .then(function () {
          done();
        });
      })
      .catch(done);
  });

  it('Não deve ser capaz de cadastrar se não estiver logado', function (done) {
    agent.post('/api/produtos')
      .send(produto)
      .expect(403)
      .end(function (produtoSaveErr, produtoSaveRes) {
        done(produtoSaveErr);
      });
  });

  it('Não deve ser capaz de retornar uma lista de produtos se não estiver logado', function (done) {
    var produtoObj = new Produto(produto);

    produtoObj.save(function () {
      agent.get('/api/produtos')
        .end(function (req, res) {
          res.body.message.should.be.equal('User is not authorized');
          done();
        });
    });
  });

  it('Não deve ser capaz de salvar um produto com login de administrador', function (done) {
    var _creds = {
      usernameOrEmail: 'new',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _user.save(function (err, user) {
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
      .send(_creds)
      .expect(200)
      .end(function (signinErr, signinRes) {

        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/produtos')
        .send(produto)
        .expect(403)
        .end(function (err, res) {
          res.body.message.should.be.equal('User is not authorized');
          done(err);
        });
      });
    });
  });

  it('Deve ser capaz de salvar um produto com login de administrador de estabelecimento', function (done) {
    agent.post('/api/auth/signin')
    .send(credentials)
    .expect(200)
    .end(function (signinErr, signinRes) {

      if (signinErr) {
        return done(signinErr);
      }

      agent.post('/api/produtos')
      .send(produto)
      .expect(200)
      .end(function (err, res) {
        res.status.should.be.equal(200);
        done(err);
      });
    });
  });

  it('deve ser capaz de retornar uma lista de produtos com login de administrador', function (done) {
    done();
  });

  it('N�o deve ser capaz de retorar um produto onde o usu�rio n�o � o proriet�rio', function (done) {
    done();
  });

  it('N�o deve ser capaz de retornar um produto pelo id de usu�rio diferente', function (done) {
    done();
  });

  it('Deve ser capaz de retornar um produto por id solicitado pelo usu�rio criador', function (done) {
    done();
  });

  afterEach(function (done) {
    Produto.remove().exec()
    .then(Estabelecimento.remove().exec())
    .then(User.remove().exec())
    .then(done())
    .catch(done);
  });
});
