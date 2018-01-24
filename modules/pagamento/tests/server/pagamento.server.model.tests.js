'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Pagamento = mongoose.model('Pagamento'),
    Estabelecimento = mongoose.model('Estabeleciento'),
    MeioPagamento = mongoose.model('MeioPagamento'),
    Produto = mongoose.model('Produto'),
    Checkin = mongoose.model('Checkin'),
    Consumo = mongoose.model('Consumo');
Produto = mongoose.model('Produto');


/**
 * Globals
 */
var user,
    usuarioCaixa,
    estabelecimento,
    consumo,
    meioPagamento,
    pagamento,
    checkin,
    produto1,
    produto2;

/**
 * Unit tests
 */
describe('Pagamento Model Unit Tests:', function() {
    before(function() {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            role: ['user']
        });

        meioPagamento = new MeioPagamento({
            usuario: user,
            tipoMeioPagamento: ['credito'],
            numero: '123456789101112',
            vencimentoDia: '09',
            vencimentoAno: '22',
            codigoSeguranca: '082'
        });

        estabelecimento = new Estabelecimento({
            nome: 'Estabelecimento01',
            cnpj: '80421067000139'
        });

        usuarioCaixa = new User({
            firstName: 'Full',
            lastName: 'Name Caixa',
            displayName: 'Full Caixa',
            email: 'caixa@test.com',
            username: 'usernamecaixa',
            password: '123456',
            estabelecimento: estabelecimento,
            role: ['caixa']
        });

        checkin = new Checkin({
            usuario: user,
            estabelecimento: estabelecimento,
            transactionId: '5307bcd7cb1ec6fc42eac7ad74a5d6f6'
        });

        produto1 = new Produto({
            descricao: 'Cerveja Heineken 600'
        });

        produto2 = new Produto({
            descricao: 'Cerveja Brahma Longneck'
        });

        produtoConsumo = new produtoConsumo({
            consumo: consumo,
            valorAplicado: 10,
            produto: produto1,
            status: 'atendido'
        });

        consumo = new Consumo({
            checkin: checkin,
            transactionId: 'f0927c99593798912cb18c6c0e56ded8',
            status: 'atendido'
        });

    });

    beforeEach(function(done) {
        usuario.save(function() {
            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            return pagamento.save(function(err) {
                should.not.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Pagamento.remove().exec();
        Usuario.remove().exec();

        done();
    });
});