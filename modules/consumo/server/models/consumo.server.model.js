'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProdutoConsumoSchema = new Schema({
    produto_id: {
      type: Schema.ObjectId,
      ref: 'Produto'
    },
    produto_descricao: String,
    produto_valor: Number,
    quantidade: Number,
    //valor: Number,
    created: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['atendido', 'estornado'],
      default: 'atendido'
    }
});

var ConsumoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  checkin_id: {
    type: Schema.ObjectId,
    ref: 'Checkin'
  },
  usuarioresp_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  produtosConsumo: [ProdutoConsumoSchema]
});

mongoose.model('ProdutoConsumo', ProdutoConsumoSchema);
mongoose.model('Consumo', ConsumoSchema);
