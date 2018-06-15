/* eslint-disable */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MemoriaCalculoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  pagamento_id: { 
      type: Schema.Types.ObjectId,
      ref: 'Pagamento' 
  }, 
  TaxaConversao: {
    type: Number
  }
});

mongoose.model('Pagamento', PagamentoSchema);
