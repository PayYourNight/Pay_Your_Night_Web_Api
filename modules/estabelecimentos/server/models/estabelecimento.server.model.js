'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Estabelecimento Schema
 */
var EstabelecimentoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Estabelecimento name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Estabelecimento', EstabelecimentoSchema);
