/* eslint-disable */
'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Checkin = mongoose.model('Checkin'),
    Estabelecimento = mongoose.model('Estabelecimento');

var user,
    estabelecimento,
    checkin;
  

describe('Checkin Model Unit Tests:', function() {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3',
      provider: 'local'
    });

    estabelecimento = new Estabelecimento({
      nome: 'Empresa01',
      cnpj: '1234566789101112'
    });

    user.save()
      .then(function () {
        estabelecimento.save()
          .then(function () {
            checkin = new Checkin({
              usuario: user,
              estabelecimento: estabelecimento
            });

            done();

          });                  
      })
      .catch(done);
  });

  describe('Metodo Salvar', function () {
    it('deve ser capaz de salvar sem problemas', function (done) {            
      checkin.save(function (err) {
        should.not.exist(err);
        return done();
      });
    });
  });

  //it('should be able to show an error when try to save without title', function (done) {
  //  article.title = '';

  //  article.save(function (err) {
  //    should.exist(err);
  //    return done();
  //  });
  //});

  afterEach(function (done) {
    Checkin.remove().exec();
    Estabelecimento.remove().exec();
    User.remove().exec();

    done();
  });
});
