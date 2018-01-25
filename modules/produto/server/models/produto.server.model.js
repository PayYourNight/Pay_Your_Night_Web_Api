'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Produto Schema
 */
var ProdutoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  descricao: {
    type: String
  }
});

mongoose.model('Produto', ProdutoSchema);
