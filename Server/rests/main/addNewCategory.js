/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 09-Jun-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var categorySrv = require('./../../services/categoriesServices');
var appConsts = require('./../../infra/appConstsAndProperties');
var logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('addNewCategory.post', logger.debug_Status.START);

    var category = {
        "categoryName": req.body.categoryName
    };

    categorySrv.addNewCategory(category, function (dbRes) {
        res.send(dbRes);
    });
});

module.exports = router;