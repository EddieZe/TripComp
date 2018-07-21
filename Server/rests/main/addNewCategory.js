/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 09-Jun-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const categorySrv = require('./../../services/categoriesServices');
const appConsts = require('./../../infra/appConstsAndProperties');
const logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('addNewCategory.post', logger.debug_Status.START);

    let category = {
        "categoryName": req.body.categoryName
    };

    categorySrv.addNewCategory(category, function (dbRes) {
        res.send(dbRes);
    });
});

module.exports = router;