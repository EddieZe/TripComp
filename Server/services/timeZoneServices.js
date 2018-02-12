/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';

var properties = require('./../infra/dataBase/dbProperties');
var logger = require('../infra/winstonLogger.js');
var timeZoneSch = require('../infra/schemas/TimeZoneSchema');
var connection = require('./../infra/dataBase/dbConnection');
var timeZoneMdl;

try {
    timeZoneMdl = connection.getConnection().model(properties.COL_TIMEZONE, timeZoneSch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}

var getTimeZonesFromDB = function (callback) {

    timeZoneMdl.find({})
        .exec(function (err, timeZonesRes) {
            if (err) {
                logger.error('timeZoneServices.getTimeZonesFromDB', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            }
            else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: timeZonesRes
                });
            }
        })
};

module.exports = {
    getTimeZonesFromDB: getTimeZonesFromDB
};