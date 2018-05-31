'use strict';


var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  estabelecimento: {
  	type: Schema.ObjectId,
  	ref: 'estabelecimento'
  },
  descricao: {
    type: String,
    required: 'A descricao do produto é requerida.'
  },
  valor: {
  	type: Number,
  	required: 'O valor do produto é requerido.'
  }
});

mongoose.model('Produto', ProdutoSchema);
