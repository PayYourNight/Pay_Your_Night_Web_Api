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
    transactionID: {
        type: String
    }
});

mongoose.model('Consumo', ConsumoSchema);