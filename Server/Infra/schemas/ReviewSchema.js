/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Oct-2015
 */
'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ReviewSch = new Schema({
    reviewId: {type: Number, required: true},
    placeId: {type: Number, required: true},
    authorName: {type: String, required: true},
    text: {type: String},
    rating:{type: Number, default: 2.5, min: 1.0, max: 5.0},
    created_at: {type: Date},
    updated_at: {type: Date}
});

ReviewSch.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

var getSchema = function () {
    return ReviewSch;
};

module.exports = {
    getSchema: getSchema
};