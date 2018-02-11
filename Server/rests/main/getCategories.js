/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 10-Jun-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var appConsts = require('./../../infra/appConstsAndProperties');
var categoriesDBCon = require('./../../services/categoriesServices.js');
var logger = require('./../../infra/winstonLogger.js');


/* retrieve Countries. */
router.get('/', function (req, res) {
    var categoriesLst;
    var categories;

    categoriesDBCon.getCategoriesFromDB(function (dbRes) {
        if (dbRes.responseInfo.isErrorOccurred) {
            res.send(dbRes);
        }
        else {

            categories = JSON.parse(JSON.stringify(dbRes.responseData));
            categoriesLst = [];

            for (var categ in categories) {
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