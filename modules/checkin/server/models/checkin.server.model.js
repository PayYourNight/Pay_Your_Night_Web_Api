'use strict';

var mongoose = require('mongoose'),
<<<<<<< HEAD
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
    estabelecimento: {
        type: Schema.ObjectId,
        ref: 'Estabelecimento'
    },
    transactionID: {
        type: String,
    }
=======
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
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe
});

mongoose.model('Checkin', CheckinSchema);
