'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConsumoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  checkin_id: Schema.Types.ObjectId,
  checkin: {
    type: Schema.ObjectId,
    ref: 'Checkin'
  },
  usuarioResp: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  produtosConsumo: [{
    produto_id: {
      type: Schema.ObjectId,
      ref: 'Produto'
    },
    quantidade: Number,
    valor: Number,
    created: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['atendido', 'estornado'],
      default: 'atendido'
    }
  }]
});

mongoose.model('Consumo', ConsumoSchema);
