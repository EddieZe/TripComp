/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  23/11/2015
 */
'use strict';

const express = require('express');
const app = express();

const getGooglePlaceInfo = require('./getGooglePlaceInfo');
const getGeocodeByAddress = require('./getGeocodeByAddress');
const getNearByPlacesInfo = require('./getNearByPlacesInfo');
const searchNearByPlaces = require('./searchNearByPlaces');
//const getPlacePhoto = require('./getPlacePhoto');
const checkAndGetPlaceInfo = require('./checkAndGetPlaceInfo');
const getTimeZoneByLocation = require('./getTimeZoneByLocation');


app.use('/getGooglePlaceInfo', getGooglePlaceInfo);
app.use('/getGeocodeByAddress', getGeocodeByAddress);
app.use('/getNearByPlacesInfo', getNearByPlacesInfo);
app.use('/searchNearByPlaces', searchNearByPlaces);
//app.use('/getPlacePhoto', getPlacePhoto);
app.use('/checkAndGetPlaceInfo', checkAndGetPlaceInfo);
app.use('/getTimeZoneByLocation', getTimeZoneByLocation);

module.exports = app;
