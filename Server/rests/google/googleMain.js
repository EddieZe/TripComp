/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  23/11/2015
 */
'use strict';

var express = require('express');
var app = express();

var getGooglePlaceInfo = require('./getGooglePlaceInfo');
var getGeocodeByAddress = require('./getGeocodeByAddress');
var getNearByPlacesInfo = require('./getNearByPlacesInfo');
var searchNearByPlaces = require('./searchNearByPlaces');
//var getPlacePhoto = require('./getPlacePhoto');
var checkAndGetPlaceInfo = require('./checkAndGetPlaceInfo');
var getTimeZoneByLocation = require('./getTimeZoneByLocation');


app.use('/getGooglePlaceInfo', getGooglePlaceInfo);
app.use('/getGeocodeByAddress', getGeocodeByAddress);
app.use('/getNearByPlacesInfo', getNearByPlacesInfo);
app.use('/searchNearByPlaces', searchNearByPlaces);
//app.use('/getPlacePhoto', getPlacePhoto);
app.use('/checkAndGetPlaceInfo', checkAndGetPlaceInfo);
app.use('/getTimeZoneByLocation', getTimeZoneByLocation);

module.exports = app;
