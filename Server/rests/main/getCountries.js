/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Feb-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var siteSrv = require('./../../services/siteServices');

/* retrieve Countries. */
router.get('/', function (req, res) {

    if (validateAndPrepareInput()) {
        execute(function (output) {
            res.send(output);
        });
    }
    else {
        res.send({
            responseInfo: {isErrorOccurred: true, responseMsg: 'Mandatory fields are missing'}
        });
    }
});

var validateAndPrepareInput = function () {
    return true;
};

function execute(callback) {
    siteSrv.getSitesFromDB(function(output){
        validateAndPrepareOutput(output, function (isOutputValid, output) {
            if (isOutputValid) {
                callback(output);
            }
            else {
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Was not able to get valid output from back systems'}
                });
            }
        })
    });
}

function validateAndPrepareOutput(output, callback) {
    var sitesLst;
    var sitesDetails;

    if (output.responseInfo.isErrorOccurred) {
        callback(false, output);
    }
    else {
        sitesDetails = JSON.parse(JSON.stringify(output.responseData));
        sitesLst = [];

        for (var site in sitesDetails) {
            if (sitesDetails.hasOwnProperty(site)) {
                sitesLst.push(sitesDetails[site])
            }
        }
        output.responseData = sitesLst;
        callback(true, output);
    }
}

module.exports = router;