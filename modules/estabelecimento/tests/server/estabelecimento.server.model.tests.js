// /* eslint-disable */
// 'use strict';

// var should = require('should'),
//     mongoose = require('mongoose'),
//     Estabelecimento = mongoose.model('Estabelecimento');

// var estabelecimento;

// describe('Estabelecimento Model Unit Tests:', function () {
//   beforeEach(function (done) {

//     estabelecimento = new Estabelecimento({
//       nome: 'Estabelecimento 01',
//       cnpj: '12646096000149'
//     });

//     done();
//   });

//   describe('Método Salvar', function () {
//     it('Deve ser capaz de cadastrar um estabelecimento sem falhas', function (done) {

//       estabelecimento.save(function (err) {
//         should.not.exist(err);
//         return done();
//       });
//     });

//     it('Não deve ser capaz de cadastrar um Estabelecimento sem o nome', function (done) {

//       estabelecimento.nome = '';

//       estabelecimento.save(function (err) {
//         should.exist(err);
//         return done();
//       });
//     });

//     it('Não deve ser capaz de cadastrar um Estabelecimento sem o CNPJ', function (done) {

//       estabelecimento.cnpj = '';

//       estabelecimento.save(function (err) {
//         should.exist(err);
//         return done();
//       });
//     });
//   });

//   afterEach(function (done) {
//     Estabelecimento.remove().exec();
//     done();
//   });
// });
