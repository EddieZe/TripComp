/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 21-Oct-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var siteMdl = require('./../../services/siteServices');
var logger = require('./../../infra/winstonLogger.js');


router.post('/', function (req, res) {

    logger.debug('updatePlacePhotoSrc.post', logger.debug_Status.START);

    console.log('for site Id: ' + req.body.siteId +' add new photo with the file name: ' + req.body.newSitePhotoSrc);
    siteMdl.updateSitePhotoSrc(req.body.siteId, req.body.newSitePhotoSrc, function (dbRes) {
        res.send(dbRes);
    })
});

module.exports = router;