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
  consumos_incluidos: [{
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
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
  }
});

mongoose.model('Checkin', CheckinSchema);
