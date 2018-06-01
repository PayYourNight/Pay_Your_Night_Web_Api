'use strict';

var mongoose = require('mongoose'),
<<<<<<< HEAD
    Schema = mongoose.Schema;
=======
  Schema = mongoose.Schema;
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe

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