/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 28-Oct-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const reviewSrv = require('./../../services/reviewServices');
const appConsts = require('./../../infra/appConstsAndProperties');
const logger = require('./../../infra/winstonLogger.js');

/* retrieve places for site. */
router.post('/', function (req, res) {

    let placeId = req.body.placeId;

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