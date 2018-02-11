/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 01-Jun-2015
 */
'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var TimeZoneSch = new Schema({
    value: {type: String},
    abbr: {type: String, length: 5},
    offset: {type: Number},
    isdst: {type: Boolean},
    text: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
});

TimeZoneSch.pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

var getSchema = function () {
    return TimeZoneSch;
};

module.exports = {
    getSchema: getSchema
};