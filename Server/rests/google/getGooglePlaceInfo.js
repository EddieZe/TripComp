/**
 ========TipMe==========
 * Author: Eddie Zeltser
 * Create Date:  13/11/2015
 */
'use strict';

var express = require('express');
var appConsts = require('../../infra/appConstsAndProperties');
var googleExecuter = require('./googleRestExecuter');
var router = express.Router();


router.post('/', function (req, res) {

    var parameters = {
        placeid: req.body.placeId
    };

    googleExecuter(appConsts.GOOGLE_APIS.GET_PLACE_DETAILS, parameters, function (response) {
        if (response.responseInfo && response.responseInfo.isErrorOccurred) {
            res.send(response)
        }
        else if(response.responseData){
            res.send(prepareOutput(response.responseData.result));
        }
    });

    var prepareOutput = function (placeDet) {
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
    }
});

module.exports = router;