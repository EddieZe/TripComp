/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 01-Jun-2015
 */
'use strict';

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const TimeZoneSch = new Schema({
    value: {type: String},
    abbr: {type: String, length: 5},
    offset: {type: Number},
    isdst: {type: Boolean},
    text: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
});

TimeZoneSch.pre('save', function(next){
    const now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

const getSchema = function () {
    return TimeZoneSch;
};

module.exports = {
    getSchema: getSchema
};