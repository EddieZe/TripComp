/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Feb-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const placeSrv = require('./../../services/placeServices');
const reviewSrv = require('./../../services/reviewServices');
const appConsts = require('./../../infra/appConstsAndProperties');
const logger = require('./../../infra/winstonLogger.js');

/* retrieve places for site. */
router.post('/', function (req, res) {

    let loc = {
        country: req.body.countryId,
        city: req.body.cityId,
        site: req.body.siteId
    };
    let placesLst = [];
    let i = 0;
    placeSrv.getPlacesFromDB(loc, function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else if (dbRes.responseData) {
            let numOfPlaces = dbRes.responseData.length;
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

const getPlaceRating = function (placeId, callback) {
    reviewSrv.getPlaceRatingFromDB(placeId, function (placeRat) {
        callback(placeRat.responseData);
    });
};

module.exports = router;