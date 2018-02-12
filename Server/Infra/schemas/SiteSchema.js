/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 20/05/2015
 */
'use strict';

var mongoose = require("mongoose")
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;

var GoogleLocationInfo = new Schema({
    lat: {type: SchemaTypes.Double, default: 0},
    lng: {type: SchemaTypes.Double, default: 0}

});

var SiteSch = new Schema({
    siteId: {type: String, length: 7},
    siteName: {type: String},
    phoneNumber: {type: String},
    address: {type: String},
    imgSource: {type: String, default: ""},
    googleInfo: {
        lat: {type: String, default: "0"},
        lng: {type: String, default: "0"}
        /*        type: Schema.ObjectId,
         ref: 'GoogleLocationInfo'*/
    },
    created_at: {type: Date},
    updated_at: {type: Date}
});

var CitySch = new Schema({
    cityId: {type: String, length: 6},
    cityName: {type: String},
    timeZone: {type: String},
    state: {type: String},
    sites: [SiteSch]
});

var StateSch = new Schema({
    stateId: {type: String, length: 5},
    stateName: {type: String}
});

var SitesSch = new Schema({
    countryId: {type: String, length: 4},
    name: {type: String},
    cities: [CitySch]
});

SiteSch.pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

var getSchema = function () {
    return SitesSch;
};

module.exports = {
    getSchema: getSchema
};