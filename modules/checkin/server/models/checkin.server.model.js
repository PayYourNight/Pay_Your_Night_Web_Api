'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Checkin Schema
 */
var CheckinSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    estabelecimento: {
        type: Schema.ObjectId,
        ref: 'Estabelecimento'
    },
    transactionID: {
        type: String,
    }
});

mongoose.model('Checkin', CheckinSchema);