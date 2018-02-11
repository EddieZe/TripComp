/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 01-Jun-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var appConsts = require('./../../infra/appConstsAndProperties');
var timeZoneSrv = require('./../../services/timeZoneServices');
var logger = require('./../../infra/winstonLogger.js');

/* retrieve Countries. */
router.get('/', function (req, res) {
    var timeZoneLst;
    var timeZoneDetails;

    timeZoneSrv.getTimeZonesFromDB(function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else {
            timeZoneDetails = JSON.parse(JSON.stringify(dbRes.responseData));
            timeZoneLst = [];

            for (var site in timeZoneDetails) {
                if (timeZoneDetails.hasOwnProperty(site)) {
                    timeZoneLst.push(timeZoneDetails[site])
                }
            }
            dbRes.responseData = timeZoneLst;
            res.send(dbRes);
        }
    });
});

module.exports = router;