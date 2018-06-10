'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConsumoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  checkin: {
    type: Schema.ObjectId,
    ref: 'Checkin'
  },
  usuarioResp: Schema.Types.ObjectId,
  produtos: [{ type: Schema.Types.ObjectId, ref: 'Produto' }]

});

mongoose.model('Consumo', ConsumoSchema);
