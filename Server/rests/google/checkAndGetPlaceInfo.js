/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  30/11/2015
 */
'use strict';

var express = require('express');
var appConsts = require('../../infra/appConstsAndProperties');
var placeSrv = require('./../../services/placeServices');
var siteMdl = require('./../../services/siteServices');
var googleExecuter = require('./googleRestExecuter');
var router = express.Router();

router.post('/', function (req, res) {

    placeSrv.checkIsPlaceExists(req.body.location, req.body.placeName, req.body.placeId, function (output) {
        if (output.responseInfo.isErrorOccurred) {
            res.send(output);
        }
        else if (output.responseData.isPlaceExist === true) {
            siteMdl.getSiteInfoFromDB(output.responseData.placeLocation, function(location){
                res.send({responseInfo: {isErrorOccurred: true, responseMsg: 'Such place already exist in the DB'}, responseData: location.responseData});
            });
        }
        else {
            getPlaceInfoFromGoogle(req.body.placeId, function (output) {
                res.send(output);
            })
        }
    });

    function getPlaceInfoFromGoogle(placeId, callback) {

        var parameters = {
            placeid: placeId
        };

        googleExecuter(appConsts.GOOGLE_APIS.GET_PLACE_DETAILS, parameters, function (response) {
            if (response.responseInfo && response.responseInfo.isErrorOccurred) {
                callback(response)
            }
            else if (response.responseData) {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: prepareOutput(response.responseData.result)
                });
            }
        });
    }

    function prepareOutput(placeDet) {
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