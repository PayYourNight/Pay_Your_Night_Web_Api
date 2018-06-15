/* eslint-disable */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PagamentoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  usuarioCaixa: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  estabelecimento: {
    type: Schema.ObjectId,
    ref: 'Estabelecimento'
  },
  consumo: {
    type: Schema.ObjectId,
    ref: 'Consumo'
  },
  meioPagamento_id: {
    type: Schema.ObjectId,
    ref: 'MeioPagamento'
  },
  discriminator: {
    type: [{
      type: String,
      enum: ['pagamentoCaixa', 'pagamentoApp']
    }],
    default: ['pagamentoApp']
  },
  formaPagamento: {
    type: [{
      type: String,
      enum: ['dinheiro', 'credito', 'debito', 'paypal']
    }],
    default: ['credito']
  },
  valorTotal: {
    type: Number,
    required: 'Valor total não pode ser calculado.'
  }
});

mongoose.model('Pagamento', PagamentoSchema);
