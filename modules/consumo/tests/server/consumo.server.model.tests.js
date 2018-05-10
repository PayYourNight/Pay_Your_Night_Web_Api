'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Estabelecimento = mongoose.model('Estabelecimento'),
    Checkin = mongoose.model('Checkin'),
    Consumo = mongoose.model('Consumo');

var user,
    estabelecimento,
    checkin,
    consumo;

describe('Consumo Model Unit Tests:', function() {
    beforeEach(function(done) {
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
            .then(function() {
                estabelecimento.save()
                    .then(function() {
                        checkin = new Checkin({
                            usuario: user,
                            estabelecimento: estabelecimento
                        });

                        checkin.save()
                            .then(function() {
                                consumo = new Consumo({
                                    checkin: checkin
                                });
                                done();
                            });
                    });
            })
            .catch(done);
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            consumo.save(function(err) {
                should.not.exist(err);
                return done();
            });
        });
    });

    afterEach(function(done) {
        Checkin.remove().exec()
            .then(Estabelecimento.remove().exec())
            .then(User.remove().exec())
            .then(done())
            .catch(done);
    });
});