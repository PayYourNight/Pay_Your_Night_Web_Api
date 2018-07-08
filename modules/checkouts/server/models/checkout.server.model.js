'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Checkout Schema
 */
var CheckoutSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  usuario_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  usuarioresp_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  checkin_id: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Checkout', CheckoutSchema);
