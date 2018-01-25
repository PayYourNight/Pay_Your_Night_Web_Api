'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * MeioPagamento Schema
 */
var MeioPagamentoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  tipoMeioPagamento: {
    type: [{
      type: String,
      enum: ['credito', 'debito', 'dinheiro', 'paypal']
    }],
    default: ['credito']
  },
  numero: {
    type: String
  },
  vencimentoDia: {
    type: String
  },
  vencimentoAno: {
    type: String
  },
  codigoSeguranca: {
    type: String
  }
});

mongoose.model('MeioPagamento', MeioPagamentoSchema);
