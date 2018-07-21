/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  12/05/2016
 */
'use strict';

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const LinkTypeSch = new Schema({
    typeId: {type: Number},
    type:  {type: String},
    name:  {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
});

LinkTypeSch.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

const getSchema = function () {
    return LinkTypeSch;
};

module.exports = {
    getSchema: getSchema
};