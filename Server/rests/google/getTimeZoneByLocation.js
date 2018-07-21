/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  12/29/2016
 */
'use strict';

const express = require('express');
const appConsts = require('../../infra/appConstsAndProperties');
const googleExecuter = require('./googleRestExecuter');
const router = express.Router();

const execute = function (req, res) {

    let parameters = {
        location: req.location,
        timestamp: 1331161200
    };

    googleExecuter(appConsts.GOOGLE_APIS.GET_TIME_ZONE_BY_LOCATION, parameters, function (response) {
        if (response.responseInfo && response.responseInfo.isErrorOccurred) {
            res.send(response)
        }
        else if (response.responseData) {
            res.send({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: prepareOutput(response.responseData)
            });
        }
    });
};

const prepareOutput = function (result) {
    return {
        timeZoneName: result.timeZoneName,
        timeZoneId: result.timeZoneId,
        rawOffset: result.rawOffset,
        dstOffset: result.dstOffset,
        formatedTimeZone: "(UTC" + (result.rawOffset !== 0 ? prepareFormattedTimeZone(result.rawOffset) : "") + ") " + result.timeZoneName
    };
};

const prepareFormattedTimeZone = function (rawOffset) {
    let time = rawOffset / 3600;
    let sign = time < 0 ? "-" : "+";
    let hour = Math.floor(Math.abs(time));
    let min = Math.floor((Math.abs(time) * 60) % 60);
    return sign + (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + min;
};

router.post('/', function (req, res) {
    execute(req.body, res);
});

module.exports = router;