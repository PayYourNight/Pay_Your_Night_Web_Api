/* eslint-disable */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PagamentoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  usuarioCaixa: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  estabelecimento_id: {
    type: Schema.ObjectId,
    ref: 'Estabelecimento'
  },
  estabelecimento_nome: {
    type: String    
  },
  checkin_id: {
    type: Schema.ObjectId,
    ref: 'Checkin'
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
    type: String,
  },
  formaPagamento: {
    type: String
  },
  valorTotal: {
    type: Number,
    required: 'Valor total não pode ser calculado.'
  }
});

mongoose.model('Pagamento', PagamentoSchema);
