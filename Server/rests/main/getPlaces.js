/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Feb-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var placeSrv = require('./../../services/placeServices');
var reviewSrv = require('./../../services/reviewServices');
var appConsts = require('./../../infra/appConstsAndProperties');
var logger = require('./../../infra/winstonLogger.js');

/* retrieve places for site. */
router.post('/', function (req, res) {

    var loc = {
        country: req.body.countryId,
        city: req.body.cityId,
        site: req.body.siteId
    };
    var placesLst = [];
    var i = 0;
    placeSrv.getPlacesFromDB(loc, function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else if (dbRes.responseData) {
            var numOfPlaces = dbRes.responseData.length;
            numOfPlaces = numOfPlaces - 1;
            dbRes.responseData.forEach(function (place) {
                getPlaceRating(place.placeId, function (rating) {
                    if (rating) {
                        place._doc.placeRating = rating;
                    }
                    placesLst.push(place);
                    if (i === numOfPlaces) {
                        dbRes.responseData = placesLst;
                        res.send(dbRes);
                    }
                    i = i + 1;
                });
            });
        }
    });
});

var getPlaceRating = function (placeId, callback) {
    reviewSrv.getPlaceRatingFromDB(placeId, function (placeRat) {
        callback(placeRat.responseData);
    });
};

module.exports = router;