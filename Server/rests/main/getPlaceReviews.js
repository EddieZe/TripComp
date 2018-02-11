/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 28-Oct-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var reviewSrv = require('./../../services/reviewServices');
var appConsts = require('./../../infra/appConstsAndProperties');
var logger = require('./../../infra/winstonLogger.js');

/* retrieve places for site. */
router.post('/', function (req, res) {

    var placeId = req.body.placeId;

    reviewSrv.getPlaceReviewsFromDB(placeId, function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else {
            res.send(dbRes);
        }
    });
});

module.exports = router;