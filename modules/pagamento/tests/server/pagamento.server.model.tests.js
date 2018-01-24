/* eslint-disable */
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
produtoConsumo = mongoose.model('ProdutoConsumo');

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

// var _user,
//     _meioPagamento,
//     _estabelecimento,
//     _usuarioCaixa,
//     _checkin,
//     _produto1,
//     _produto2,
//     _consumo,
//     _produtoConsumo;

describe('Pagamento Model Unit Tests:', function() {
    before(function() {
        user = {
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            role: ['user']
        };

        meioPagamento = {
            usuario: user,
            tipoMeioPagamento: ['credito'],
            numero: '123456789101112',
            vencimentoDia: '09',
            vencimentoAno: '22',
            codigoSeguranca: '082'
        };

        estabelecimento = {
            nome: 'Estabelecimento01',
            cnpj: '80421067000139'
        };

        usuarioCaixa = {
            firstName: 'Full',
            lastName: 'Name Caixa',
            displayName: 'Full Caixa',
            email: 'caixa@test.com',
            username: 'usernamecaixa',
            password: '123456',
            estabelecimento: estabelecimento,
            role: ['caixa']
        };

        checkin = new {
            usuario: user,
            estabelecimento: estabelecimento,
            transactionId: '5307bcd7cb1ec6fc42eac7ad74a5d6f6'
        };

        produto1 = new {
            descricao: 'Cerveja Heineken 600'
        };

        produto2 = new {
            descricao: 'Cerveja Brahma Longneck'
        };

        consumo = new {
            checkin: checkin,
            transactionId: 'f0927c99593798912cb18c6c0e56ded8',
        };

        produtoConsumo = {
            consumo: consumo,
            valorAplicado: 10,
            produto: produto1,
            status: 'atendido'
        };

        produtoConsumo = {
            consumo: consumo,
            valorAplicado: 12,
            produto: produto2,
            status: 'atendido'
        };
    });

    beforeEach(function(done) {
        var _user = new User(user);
        _user.save();

        var _meioPagamento = new MeioPagamento(meioPagamento);
        _meioPagamento.user = _user;
        _meio.save();

        var _estabelecimento = new Estabelecimento(estabelecimento);
        _estabelecimento.save();

        var _usuarioCaixa = new User(usuarioCaixa);
        _usuarioCaixa.estabelecimento = _estabelecimento;
        _usuarioCaixa.save();

        var _checkin = new Checkin(checkin);
        _checkin.usuario = _user;
        _checkin.estabelecimento = _estabelecimento;
        _checkin.save();

        var _produto1 = new Produto(produto1);
        _produto1.save();

        var _produto2 = new Produto(produto2);
        _produto2.save();

        var _consumo = new Consumo(consumo);
        _consumo.checkin = _checkin;
        _consumo.save();

        var _produtoConsumo = new ProdutoConsumo(produtoConsumo);
        _produtoConsumo.consumo = _consumo;
        _produtoConsumo.produto = _produto1;
        _produtoConsumo.save();

        var _produtoConsumo = new ProdutoConsumo(produtoConsumo);
        _produtoConsumo.consumo = _consumo;
        _produtoConsumo.produto = _produto1;
        _produtoConsumo.save();

        done();
    });

    describe('Method Save', function() {
        it('deve ser capaz de realizar o pagemento pelo aplicativo com cartao de credito sem problemas.', function(done) {

            pagamento = new Pagamento();
            pagamento.usuario = _user;
            pagamento.estabelecimento = _estabelecimento;
            pagamento.consumo = _consumo;
            pagamento.meioPagamento = _meioPagamento;
            pagamento.discriminator = ['pagamentoApp'];
            pagamento.formaPagamento = ['credito'];
            pagamento.valorTotal = 20;

            pagamento.save(function(err) {
                should.not.exist(err);
                pagamento.remove(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        Pagamento.remove().exec();
        user.remove().exec();
        meioPagamento.remove().exec();
        estabelecimento.remove().exec();
        usuarioCaixa.remove().exec();
        checkin.remove().exec();
        produto1.remove().exec();
        produto2.remove().exec();
        produtoConsumo.remove().exec();
        produtoConsumo.remove().exec();
        pagamento.remove().exec();

        done();
    });
});