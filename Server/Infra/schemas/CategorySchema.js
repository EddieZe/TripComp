/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 09-Jun-2015
 */
'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var CategorySch = new Schema({
    categoryId: {type: Number},
    categoryName: {type: String},
    priority: {type: Number},
    created_at: {type: Date},
    updated_at: {type: Date}
});

CategorySch.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

var getSchema = function () {
    return CategorySch;
};

module.exports = {
    getSchema: getSchema
};