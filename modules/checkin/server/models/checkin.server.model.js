'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  usuarioResp_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  estabelecimento_id: {
    type: Schema.Types.ObjectId,
    ref: 'Estabelecimento'
  },
  estabelecimento_nome: {
    type: String
  },
  consumos_incluidos: [{
    usuario_id: String
  }],
  consumo_transferido: {
    type: Boolean,
    default: false
  },
  usuario_transferencia: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ativo: {
    type: Boolean,
    default: true
  },
  aguardandoCheckout: {
    type: Boolean,
    default: true
  }
});

mongoose.model('Checkin', CheckinSchema);
