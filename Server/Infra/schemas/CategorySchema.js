/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 09-Jun-2015
 */
'use strict';

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const CategorySch = new Schema({
    categoryId: {type: Number},
    categoryName: {type: String},
    priority: {type: Number},
    created_at: {type: Date},
    updated_at: {type: Date}
});

CategorySch.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

const getSchema = function () {
    return CategorySch;
};

module.exports = {
    getSchema: getSchema
};