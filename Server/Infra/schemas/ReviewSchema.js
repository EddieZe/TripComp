/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Oct-2015
 */
'use strict';

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const ReviewSch = new Schema({
    reviewId: {type: Number, required: true},
    placeId: {type: Number, required: true},
    authorName: {type: String, required: true},
    text: {type: String},
    rating:{type: Number, default: 2.5, min: 1.0, max: 5.0},
    created_at: {type: Date},
    updated_at: {type: Date}
});

ReviewSch.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

const getSchema = function () {
    return ReviewSch;
};

module.exports = {
    getSchema: getSchema
};