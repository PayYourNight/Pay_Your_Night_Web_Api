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
  usuarioResp: Schema.Types.ObjectId,
  produtosConsumo: [{
    produto_id: Schema.Types.ObjectId,
    quantidade: Number,
    // quantidade: {
    //   type: Number,
    //   require: function (q) {
    //     return q > 0;
    //   }
    // },
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
