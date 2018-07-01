'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MemoriaCalculoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pagamento_id: {
    type: Schema.Types.ObjectId,
    ref: 'Pagamento'
  },
  taxaConversaoPagamentoCredito: {
    type: Number
  },
  percentualTransacao: {
    type: Number
  }
});

mongoose.model('MemoriaCalculo', MemoriaCalculoSchema);
