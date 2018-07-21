/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 11-Jun-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const placeSrv = require('./../../services/placeServices');
const logger = require('./../../infra/winstonLogger.js');
const appConsts = require('./../../infra/appConstsAndProperties');

router.post('/', function (req, res) {

    logger.debug('addNewPlace.post', logger.debug_Status.START);
    placeSrv.addNewPlaceToDB(req.body.newPlaceInfo, function (dbRes) {
        if (!dbRes.responseInfo.isErrorOccurred) {
            logger.debug('New place was added: placeId:' + dbRes.responseData.placeId + ' placeName: ' + dbRes.responseData.name, logger.debug_Status.END);
        }
        res.send(dbRes);
    })
});

module.exports = router;