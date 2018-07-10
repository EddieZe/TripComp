/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  12/29/2016
 */
'use strict';

var express = require('express');
var appConsts = require('../../infra/appConstsAndProperties');
var googleExecuter = require('./googleRestExecuter');
var router = express.Router();

var execute = function (req, res) {

    var parameters = {
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

var prepareOutput = function (result) {
    var timeZone = {
        timeZoneName: result.timeZoneName,
        timeZoneId: result.timeZoneId,
        rawOffset: result.rawOffset,
        dstOffset: result.dstOffset,
        formatedTimeZone: "(UTC" + (result.rawOffset !== 0 ? prepareFormattedTimeZone(result.rawOffset) : "") + ") " + result.timeZoneName
    };
    return timeZone
};

var prepareFormattedTimeZone = function (rawOffset) {
    var time = rawOffset / 3600;
    var sign = time < 0 ? "-" : "+";
    var hour = Math.floor(Math.abs(time));
    var min = Math.floor((Math.abs(time) * 60) % 60);
    return sign + (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + min;
};

router.post('/', function (req, res) {
    execute(req.body, res);
});

module.exports = router;