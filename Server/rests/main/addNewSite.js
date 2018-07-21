/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 31-May-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const siteServices = require('./../../services/siteServices');
const appConsts = require('./../../infra/appConstsAndProperties');
const logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('addNewSite.post', logger.debug_Status.START);

    let timeZone = '';
    if (req.body.timeZone) {
        timeZone = req.body.newSiteInfo.timeZone.text;
    }
    let site = {
        "isImageSelected": req.body.newSiteInfo.isImageSelected,
        "name": req.body.newSiteInfo.countryName,
        "cities": [
            {
                "cityName": req.body.newSiteInfo.cityName,
                "timeZone": timeZone,
                "sites": [
                    {
                        "siteName": req.body.newSiteInfo.siteName,
                        "address": req.body.newSiteInfo.siteAddress,
                        "googleInfo": req.body.newSiteInfo.googleInfo
                    }
                ]
            }
        ]
    };

    siteServices.addSiteToDB(site, function (dbRes) {
        if (!dbRes.responseInfo.isErrorOccurred) {
            logger.debug('New site added: siteId:' + dbRes.responseData.siteId + ' siteName: ' + dbRes.responseData.siteName, logger.debug_Status.END);
        }
        res.send(dbRes);
    });
});

module.exports = router;