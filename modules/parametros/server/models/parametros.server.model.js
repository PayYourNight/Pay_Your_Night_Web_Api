'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Parametros Schema
 */
var ParametrosSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  },
  taxaConversaoPagamentoCredito: {
    type: Number
  },
  percentualTransacao: {
    type: Number
  }
});

mongoose.model('Parametros', ParametrosSchema);
