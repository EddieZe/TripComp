/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 20/05/2015
 */
'use strict';

const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const DayOpenHours = new Schema({
    day: {type: String},
    hours: {type: String}
});

const ImageSch = new Schema({
    type: {type: String, default: "LOCAL"},
    source: {type: String, default: "images/placeIcon.jpg"},
    added_at: {type: Date}
});

const PlaceSch = new Schema({
    placeId: {type: Number},
    location: {
        countryId: {type: String, length: 4},
        cityId: {type: String, length: 6},
        state: {type: String, length: 5},
        siteId: {type: String, length: 7}
    },
    placeLevel: {type: Number},
    categoryId: [{type: Number}],
    name: {type: String},
    desc: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    openHours: [DayOpenHours],
    links: [{
        type: {type: String},
        name: {type: String},
        URL: {type: String, default: ""}
    }],
    imgSource: [ImageSch],
    googleInfo: {
        googlePlaceId: {type: String, default: ""},
        locationInfo: {
            lat: {type: String, default: "0.0"},
            lng: {type: String, default: "0.0"}
        }
    },
    created_at: {type: Date},
    updated_at: {type: Date}
});

PlaceSch.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

PlaceSch.pre('update', function () {
    const now = new Date();
    this.updated_at = now;
    next();
});

PlaceSch.pre('update', function () {
    this.imgSource.added_at = new Date();
});

const getSchema = function () {
    return PlaceSch;
};

module.exports = {
    getSchema: getSchema
};