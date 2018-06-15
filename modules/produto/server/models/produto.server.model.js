'use strict';


var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  estabelecimento_id: {
    type: Schema.ObjectId,
    ref: 'Estabelecimento'
  },
  descricao: {
    type: String,
    required: 'A descricao do produto é requerida.'
  },
  valor: {
    type: Number,
    required: 'O valor do produto é requerido.'
  },
  imagem: {
    type: String
  }
});

mongoose.model('Produto', ProdutoSchema);
