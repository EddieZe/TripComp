/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';

const properties = require('./../infra/dataBase/dbProperties');
const logger = require('../infra/winstonLogger.js');
const timeZoneSch = require('../infra/schemas/TimeZoneSchema');
const connection = require('./../infra/dataBase/dbConnection');

let timeZoneMdl;

try {
    timeZoneMdl = connection.getConnection().model(properties.COL_TIMEZONE, timeZoneSch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}

const getTimeZonesFromDB = function (callback) {

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