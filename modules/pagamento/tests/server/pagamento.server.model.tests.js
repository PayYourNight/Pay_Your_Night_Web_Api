'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    UserCaixa = mongoose.model('User'),
    MeioPagamento = mongoose.model('MeioPagamento'),
    Estabelecimento = mongoose.model('Estabelecimento'),
    Checkin = mongoose.model('Checkin'),
    Consumo = mongoose.model('Consumo'),
    Produto = mongoose.model('Produto'),
    ProdutoConsumo = mongoose.model('ProdutoConsumo'),
    Pagamento = mongoose.model('Pagamento');

var user,
    userCaixa,
    meioPagamento,
    estabelecimento,
    checkin,
    consumo,
    produto,
    produtoConsumo,
    pagamento;

describe('Pagamento Model Unit Tests:', function () {
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
                meioPagamento = new MeioPagamento({
                    usuario: user,
                    tipoMeioPagamento: ['credito'],
                    numero: '123456789101112',
                    vencimentoDia: '09',
                    vencimentoAno: '22',
                    codigoSeguranca: '082'
                });
                meioPagamento.save()
                    .then(function () {
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
                                        consumo.save()
                                            .then(function() {
                                                produto = new Produto({
                                                    descricao: 'Heineken 600',
                                                    estabelecimento: estabelecimento,
                                                    valor: 10
                                                });
                                                produto.save()
                                                    .then(function() {
                                                        produtoConsumo = new ProdutoConsumo({
                                                            consumo: consumo,
                                                            produto: produto,
                                                            quantidade: 2,
                                                            valorAplicado: 10,
                                                            status: ['atendido']
                                                        });
                                                        produtoConsumo.save()
                                                            .then(function() {
                                                                userCaixa.save()
                                                                    .then(function() {
                                                                        pagamento = new Pagamento({
                                                                            usuario: user,
                                                                            usuarioCaixa: userCaixa,
                                                                            meioPagamento,
                                                                            estabelecimento: estabelecimento,
                                                                            consumo: consumo,
                                                                            discriminator: ['pagamentoApp'],
                                                                            formaPagamento: ['credito'],
                                                                            valorTotal: 20
                                                                        });
                                                                        done();
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            })
            .catch(done);
    });

    describe('Metodo Salvar', function() {
        it('Deve ser capaz de salvar sem problemas', function(done) {
            pagamento.save(function(err) {
                should.not.exist(err);
                return done();
            });
        });
    });

    afterEach(function(done) {
        Pagamento.remove().exec()
            .then(ProdutoConsumo.remove().exec())
            .then(UserCaixa.remove().exec())
            .then(ProdutoConsumo.remove().exec())
            .then(Produto.remove().exec())
            .then(Consumo.remove().exec())
            .then(Checkin.remove().exec())
            .then(Estabelecimento.remove().exec())
            .then(User.remove().exec())
            .then(done())
            .catch(done);
    });
});