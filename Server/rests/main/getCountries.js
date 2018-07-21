/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Feb-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const siteSrv = require('./../../services/siteServices');

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

const validateAndPrepareInput = function () {
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
    let sitesLst;
    let sitesDetails;

    if (output.responseInfo.isErrorOccurred) {
        callback(false, output);
    }
    else {
        sitesDetails = JSON.parse(JSON.stringify(output.responseData));
        sitesLst = [];

        for (let site in sitesDetails) {
            if (sitesDetails.hasOwnProperty(site)) {
                sitesLst.push(sitesDetails[site])
            }
        }
        output.responseData = sitesLst;
        callback(true, output);
    }
}

module.exports = router;