// 'use strict';

// var should = require('should'),
//   request = require('supertest'),
//   path = require('path'),
//   mongoose = require('mongoose'),
//   express = require(path.resolve('./config/lib/express')),
//   User = mongoose.model('User'),
//   UserCaixa = mongoose.model('User'),
//   MeioPagamento = mongoose.model('MeioPagamento'),
//   Estabelecimento = mongoose.model('Estabelecimento'),
//   Checkin = mongoose.model('Checkin'),
//   Consumo = mongoose.model('Consumo'),
//   Produto = mongoose.model('Produto'),
//   ProdutoConsumo = mongoose.model('ProdutoConsumo'),
//   Pagamento = mongoose.model('Pagamento');

// var app,
//   agent,
//   credentials,
//   user,
//   userCaixa,
//   meioPagamento,
//   estabelecimento,
//   checkin,
//   consumo,
//   produto,
//   produtoConsumo,
//   pagamento;

// describe('Pagamento Server Routes tests', function () {

//   before(function (done) {
//     // Get application
//     app = express.init(mongoose.connection.db);
//     agent = request.agent(app);

//     done();
//   });

//   beforeEach(function (done) {
//     // Create user credentials
//     credentials = {
//       usernameOrEmail: 'username',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };

//     // Create a new user
//     user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'test@test.com',
//       username: credentials.usernameOrEmail,
//       password: credentials.password,
//       provider: 'local'
//     });

//     userCaixa = new UserCaixa({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'caixa@test.com',
//       username: 'username1',
//       password: 'M3@n.jsI$Aw3$0m3',
//       provider: 'local',
//       role: ['caixa']
//     });

//     estabelecimento = new Estabelecimento({
//       nome: 'Empresa01',
//       cnpj: '1234566789101112'
//     });

//     user.save()
//       .then(function () {
//         meioPagamento = new MeioPagamento({
//           usuario: user,
//           tipoMeioPagamento: ['credito'],
//           numero: '123456789101112',
//           vencimentoDia: '09',
//           vencimentoAno: '22',
//           codigoSeguranca: '082'
//         });
//         meioPagamento.save()
//           .then(function () {
//             estabelecimento.save()
//               .then(function () {
//                 checkin = new Checkin({
//                   usuario: user,
//                   estabelecimento: estabelecimento
//                 });
//                 checkin.save()
//                   .then(function () {
//                     consumo = new Consumo({
//                       checkin: checkin
//                     });
//                     consumo.save()
//                       .then(function () {
//                         produto = new Produto({
//                           descricao: 'Heineken 600',
//                           estabelecimento: estabelecimento,
//                           valor: 10
//                         });
//                         produto.save()
//                           .then(function () {
//                             produtoConsumo = new ProdutoConsumo({
//                               consumo: consumo,
//                               produto: produto,
//                               quantidade: 2,
//                               valorAplicado: 10,
//                               status: ['atendido']
//                             });
//                             produtoConsumo.save()
//                               .then(function () {
//                                 userCaixa.save()
//                                   .then(function () {
//                                     pagamento = new Pagamento({
//                                       usuario: user,
//                                       usuarioCaixa: userCaixa,
//                                       meioPagamento,
//                                       estabelecimento: estabelecimento,
//                                       consumo: consumo,
//                                       discriminator: ['pagamentoApp'],
//                                       formaPagamento: ['credito'],
//                                       valorTotal: 20
//                                     });
//                                     done();
//                                   });
//                               });
//                           });
//                       });
//                   });
//               });
//           });
//       })
//       .catch(done);
//   });

//   // it('should not be able to save an article if logged in without the "admin" role', function (done) {
//   //  agent.post('/api/auth/signin')
//   //    .send(credentials)
//   //    .expect(200)
//   //    .end(function (signinErr, signinRes) {
//   //      // Handle signin error
//   //      if (signinErr) {
//   //        return done(signinErr);
//   //      }

//   //      agent.post('/api/articles')
//   //        .send(article)
//   //        .expect(403)
//   //        .end(function (articleSaveErr, articleSaveRes) {
//   //          // Call the assertion callback
//   //          done(articleSaveErr);
//   //        });

//   //    });
//   // });

//   it('Não deve ser capaz de realizar um pagamento se não estiver logado', function (done) {
//     agent.post('/api/pagamentos')
//       .send(pagamento)
//       .expect(403)
//       .end(function (pagamentoSaveErr, pagamentoSaveRes) {
//         done(pagamentoSaveErr);
//       });
//   });

//   it('Não deve ser capaz de retornar uma lista de pagamentos se nãoo estiver logado', function (done) {
//     var pagamentoObj = new Pagamento(pagamento);

//     pagamentoObj.save(function () {
//       agent.get('/api/pagamentos')
//         .end(function (req, res) {
//           res.body.message.should.be.equal('User is not authorized');
//           done();
//         });
//     });
//   });

//   it('Não deve ser capaz de salvar um pagamento com login de administrador', function (done) {
//     var _creds = {
//       usernameOrEmail: 'new',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };

//     // Create orphan user
//     var _user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'orphan@test.com',
//       username: _creds.usernameOrEmail,
//       password: _creds.password,
//       provider: 'local',
//       roles: ['admin']
//     });


//     _user.save(function (err, user) {
//       if (err) {
//         return done(err);
//       }

//       agent.post('/api/auth/signin')
//       .send(_creds)
//       .expect(200)
//       .end(function (signinErr, signinRes) {

//         if (signinErr) {
//           return done(signinErr);
//         }

//         agent.post('/api/pagamentos')
//         .send(pagamento)
//         .expect(403)
//         .end(function (err, res) {
//           res.body.message.should.be.equal('User is not authorized');
//           done(err);
//         });
//       });
//     });
//   });

//   it('Deve ser capaz de salvar um pagamento com login de usuario', function (done) {
//     agent.post('/api/auth/signin')
//     .send(credentials)
//     .expect(200)
//     .end(function (signinErr, signinRes) {

//       if (signinErr) {
//         return done(signinErr);
//       }

//       agent.post('/api/pagamentos')
//       .send(pagamento)
//       .expect(200)
//       .end(function (err, res) {
//         res.status.should.be.equal(200);
//         done(err);
//       });
//     });
//   });

//   it('deve ser capaz de retornar uma lista de pagamentos com login de administrador', function (done) {
//     done();
//   });

//   it('N�o deve ser capaz de retorar um pagamento onde o usu�rio n�o � o proriet�rio', function (done) {
//     done();
//   });

//   it('N�o deve ser capaz de retornar um pagamento pelo id de usu�rio diferente', function (done) {
//     done();
//   });

//   it('Deve ser capaz de retornar um pagamento por id solicitado pelo usu�rio criador', function (done) {
//     done();
//   });

//   afterEach(function (done) {
//     Pagamento.remove().exec()
//     .then(ProdutoConsumo.remove().exec())
//     .then(UserCaixa.remove().exec())
//     .then(ProdutoConsumo.remove().exec())
//     .then(Produto.remove().exec())
//     .then(Consumo.remove().exec())
//     .then(Checkin.remove().exec())
//     .then(Estabelecimento.remove().exec())
//     .then(User.remove().exec())
//     .then(done())
//     .catch(done);
//   });
// });
