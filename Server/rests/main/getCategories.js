/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 10-Jun-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const appConsts = require('./../../infra/appConstsAndProperties');
const categoriesDBCon = require('./../../services/categoriesServices.js');
const logger = require('./../../infra/winstonLogger.js');


/* retrieve Countries. */
router.get('/', function (req, res) {
    let categoriesLst;
    let categories;

    categoriesDBCon.getCategoriesFromDB(function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else {

            categories = JSON.parse(JSON.stringify(dbRes.responseData));
            categoriesLst = [];

            for (let categ in categories) {
                if (categories.hasOwnProperty(categ)) {
                    categoriesLst.push(categories[categ])
                }
            }
            dbRes.responseData = categoriesLst;
            res.send(dbRes);
        }
    });
});

module.exports = router;