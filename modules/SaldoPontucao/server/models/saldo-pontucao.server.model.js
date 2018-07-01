'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * SaldoPontucao Schema
 */
var SaldoPontuacaoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  memoriaCalculo_id: {
    type: Schema.ObjectId,
    ref: 'MemoriaCalculo'
  },
  valorMovimentado: {
  	type: Number
  },
  tipoMovimentacao:{
  	type: String
  }
});

mongoose.model('SaldoPontuacao', SaldoPontuacaoSchema);
