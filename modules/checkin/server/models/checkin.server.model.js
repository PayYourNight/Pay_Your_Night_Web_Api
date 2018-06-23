'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  usuario_id: Schema.Types.ObjectId,
  usuarioResp_id: Schema.Types.ObjectId,
  estabelecimento_id: Schema.Types.ObjectId,
  ativo: {
    type: Boolean,
    default: true
  }
});

mongoose.model('Checkin', CheckinSchema);
