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
  // Checkin model fields
  // ...
});

mongoose.model('Checkin', CheckinSchema);
