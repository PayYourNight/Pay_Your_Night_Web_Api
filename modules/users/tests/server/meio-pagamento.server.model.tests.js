// 'use strict';

// var should = require('should'),
//   mongoose = require('mongoose'),
//   User = mongoose.model('User'),
//   MeioPagamento = mongoose.model('MeioPagamento');

// var user,
//   meioPagamento;

// describe('Meio pagamento Model Unit Tests:', function () {
//   beforeEach(function (done) {
//     user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'test@test.com',
//       username: 'username',
//       password: 'M3@n.jsI$Aw3$0m3',
//       provider: 'local'
//     });

//     user.save().then(function () {
//       meioPagamento = new MeioPagamento({
//         usuario: user,
//         tipoMeioPagamento: ['credito'],
//         numero: '123456789101112',
//         vencimentoDia: '09',
//         vencimentoAno: '22',
//         codigoSeguranca: '082'
//       });

//       done();
//     }).catch(done);
//   });

//   describe('M�todo Salvar', function() {
//     it('Deve ser capaz de salvar sem problemas', function(done) {
//       meioPagamento.save(function(err) {
//         should.not.exist(err);
//         return done();
//       });
//     });
//   });

//   afterEach(function(done) {
//     MeioPagamento.remove().exec()
//       .then(User.remove().exec())
//       .then(done())
//       .catch(done);
//   });
// });
