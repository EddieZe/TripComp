/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  13/05/2016
 */
'use strict';

var express = require('express');
var router = express.Router();
var placeMdl = require('./../../services/placeServices');
var logger = require('./../../infra/winstonLogger.js');


router.post('/', function (req, res) {

    logger.debug('updatePlaceLinks.post', logger.debug_Status.START);

    console.log('Updating place links for place Id: ' + req.body.placeId);
    placeMdl.updatePlaceLinks(req.body.placeId, req.body.links, function (dbRes) {
        res.send(dbRes);
    })
});

module.exports = router;