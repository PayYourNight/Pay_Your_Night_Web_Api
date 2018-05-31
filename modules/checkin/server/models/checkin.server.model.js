'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  usuarioResp: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  estabelecimento: {
    type: Schema.ObjectId,
    ref: 'Estabelecimento'
  }
});

mongoose.model('Checkin', CheckinSchema);
