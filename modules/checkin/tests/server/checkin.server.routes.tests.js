/*'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  express = require(path.resolve('./config/lib/express')),

  User = mongoose.model('User'),
  UserCaixa = mongoose.model('User'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  Checkin = mongoose.model('Checkin'),

var app,
    agent,
    credentials,
    user,
    userCaixa,
    estabelecimento,
    checkin;


describe('Checkin Server Routes tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose.connection.db);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    userCaixa = new UserCaixa({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'caixa@test.com',
      username: 'username1',
      password: 'M3@n.jsI$Aw3$0m3',
      provider: 'local',
      role: ['caixa']
    });

    estabelecimento = new Estabelecimento({
      nome: 'Empresa01',
      cnpj: '1234566789101112'
    });

    user.save()
      .then(function () {
            estabelecimento.save()
              .then(function () {
                    userCaixa.save()
                      .then(function () {
                        done();
                    });
            });
     })
     .catch(done);
  });

  
  it('Não deve ser capaz de realizar um checkin se não estiver logado', function (done) {
    agent.post('/api/checkins')
      .send(checkin)
      .expect(403)
      .end(function (checkinSaveErr, checkinSaveRes) {
        done(checkinSaveErr);
      });
  });


  it('Não deve ser capaz de realizar um checkin se não estiver logado como "caixa" ou "admEst"', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {        
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/articles')
          .send(checkin)
          .expect(403)
          .end(function (articleSaveErr, articleSaveRes) {            
            done(articleSaveErr);
          });
      });
  });


  */it('Não deve ser capaz de retornar uma lista de checkin se não estiver logado', function (done) {
    var checkinObj = new Checkin(checkin);

    checkinObj.save(function () {
      agent.get('/api/checkins')
        .end(function (req, res) {
          res.body.message.should.be.equal('User is not authorized');
          done();
        });
    });
  });*/

  it('Deve ser capaz de salvar um checkin com login de admEstst', function (done) {
    var _creds = {
      username: 'new',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['adminEst']
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

        agent.post('/api/checkins')
        .send(checkin)
        .expect(200)
        .end(function (err, res) {          
          done(err);
        });
      });
    });
  });

  it('Deve ser capaz de salvar um checkin com login de caixa', function (done) {
  	var _creds = {
      username: userCaixa.username,
      password: userCaixa.password
    };

    agent.post('/api/auth/signin')
    .send(credentials)
    .expect(200)
    .end(function (signinErr, signinRes) {

      if (signinErr) {
        return done(signinErr);
      }

      agent.post('/api/checkins')
      .send(checkin)
      .expect(200)
      .end(function (err, res) {
        res.status.should.be.equal(200);
        done(err);
      });
    });
  });

  afterEach(function (done) {
    Checkin.remove().exec()
    .then(ProdutoConsumo.remove().exec())
    .then(UserCaixa.remove().exec())
    .then(Checkin.remove().exec())
    .then(Estabelecimento.remove().exec())
    .then(User.remove().exec())
    .then(done())
    .catch(done);
  });
});

*/