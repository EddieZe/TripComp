/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  15/05/2016
 */
'use strict';

var express = require('express');
var router = express.Router();
var linkTypeSrv = require('./../../services/linkTypeServices');

/* retrieve Countries. */
router.get('/', function (req, res) {

    linkTypeSrv.getLinkTypesFromDB(function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else {
            res.send(dbRes);
        }
    });
});

module.exports = router;