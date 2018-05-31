'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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
    type: Number,
    required: 'O número do cartão deve ser informado',
  },
  vencimentoDia: {
    type: String,
    required: 'O dia do vencimento deve ser informado',
  },
  vencimentoAno: {
    type: String,
    required: 'O ano do vencimento deve ser informado',
  },
  codigoSeguranca: {
    type: String,
    required: 'O código de segurança deve ser informado',
  }
});

mongoose.model('MeioPagamento', MeioPagamentoSchema);
