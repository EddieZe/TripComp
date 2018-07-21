/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 01-Jun-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const appConsts = require('./../../infra/appConstsAndProperties');
const timeZoneSrv = require('./../../services/timeZoneServices');
const logger = require('./../../infra/winstonLogger.js');

/* retrieve Countries. */
router.get('/', function (req, res) {
    let timeZoneLst;
    let timeZoneDetails;

    timeZoneSrv.getTimeZonesFromDB(function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else {
            timeZoneDetails = JSON.parse(JSON.stringify(dbRes.responseData));
            timeZoneLst = [];

            for (let site in timeZoneDetails) {
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