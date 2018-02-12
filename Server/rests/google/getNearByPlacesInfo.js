/**
 ========TripComp==========
 * Author: Eddie Zeltser
 * Create Date:  22/11/2015
 */
'use strict';

var express = require('express');
var appConsts = require('../../infra/appConstsAndProperties');
var googleExecuter = require('./googleRestExecuter');
var router = express.Router();


router.post('/', function (req, res) {

    //Prepare Input for getNearByPlaces
    var parameters = {
        location: req.body.location,
        radius: req.body.radius,
        keyword: req.body.keyword
    };

    //call getNearbyPlaces
    googleExecuter(appConsts.GOOGLE_APIS.GET_NEARBY_PLACES, parameters, function (places) {
        if (places.responseInfo.isErrorOccurred) {
            res.send(places)
        }
        else if (places.responseData.status == appConsts.GOOGLE_STATUS.ZERO_RESULTS) {
            res.send({
                responseInfo: {isErrorOccurred: false, responseMsg: 'No data Found.', errorData: appConsts.GOOGLE_STATUS.ZERO_RESULTS},
                responseData: null
            });
        }
        else {
            var input = prepareInputForGetPlacesInfo(places.responseData.results);
            callGetPlacesInfo(input, function (output) {
                res.send({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: output
                });
            });
        }
    });

});

var prepareInputForGetPlacesInfo = function (googleOutput) {
    var result = [];
    for (var i = 0; i < appConsts.MAX_RESULTS && i < googleOutput.length; i++) {
        result[i] = {};
        result[i].placeid = googleOutput[i].place_id;
    }
    return result;
};

var populatePlaceInfo = function (placeDet) {

    return {
        name: placeDet.name,
        address: (placeDet.formatted_address) ? placeDet.formatted_address : placeDet.vicinity,
        location: placeDet.geometry.location,
        phoneNumber: (placeDet.international_phone_number) ? placeDet.international_phone_number : placeDet.formatted_phone_number,
        placeId: placeDet.place_id,
        googleRating: placeDet.rating,
        userRatingsTotal: placeDet.user_ratings_total,
        categories: placeDet.types,
        website: placeDet.website,
        photoRef: (placeDet.photos && placeDet.photos[0]) ? placeDet.photos[0].photo_reference : undefined,
        icon: placeDet.icon,
        isOpenNow: (placeDet.opening_hours) ? placeDet.opening_hours.open_now : undefined
    }
};

var callGetPlacesInfo = function (places, callback) {
    var placesInfo = [];
    var j = 0;
    places.forEach(function (el) {
        googleExecuter(appConsts.GOOGLE_APIS.GET_PLACE_DETAILS, el, function (placeInfo) {
            if (placeInfo.responseInfo && !placeInfo.responseInfo.isErrorOccurred) {
                placesInfo[j] = (populatePlaceInfo(placeInfo.responseData.result));
                j = j + 1;
            }
            if (j === places.length) {
                callback(placesInfo);
            }
        });
    });
};

module.exports = router;