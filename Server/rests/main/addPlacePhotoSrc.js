/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 21-Oct-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const placeSrv = require('./../../services/placeServices');
const logger = require('./../../infra/winstonLogger.js');


router.post('/', function (req, res) {

    logger.debug('updatePlacePhotoSrc.post', logger.debug_Status.START);

    placeSrv.addPlacePhotoSrc(req.body.placeId, req.body.newPlacePhotoSrc, function (dbRes) {
        res.send(dbRes);
    })
});

module.exports = router;