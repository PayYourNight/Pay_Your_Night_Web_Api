'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Estabelecimento Schema
 */
var EstabelecimentoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  nome: {
    type: String,
    required: 'O Nome do estabelecimento deve ser preenchido.'
  },
  cnpj: {
    type: String,
    required: 'O CNPJ do estabelecimento deve ser preenchido.'
  }
});

mongoose.model('Estabelecimento', EstabelecimentoSchema);
