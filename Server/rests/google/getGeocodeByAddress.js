/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  12/9/2016
 */
'use strict';

const express = require('express');
const appConsts = require('../../infra/appConstsAndProperties');
const googleExecuter = require('./googleRestExecuter');
const router = express.Router();
const getTimeZoneByLocation = require('./getTimeZoneByLocation');


router.post('/', function (req, res) {

    let parameters = {
        address: req.body.address
    };

    googleExecuter(appConsts.GOOGLE_APIS.GET_GEOCODE_BY_ADDRESS, parameters, function (response) {
        if (response.responseInfo && response.responseInfo.isErrorOccurred) {
            res.send(response)
        }
        else if (response.responseData) {
            res.send({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: prepareOutput(response.responseData.results)
            });
        }
    });

    const prepareOutput = function (results) {
        let locationInfo = [];
        results.forEach(function (res) {
            let loc = {
                types: res.types,
                formattedAddress: (res.formatted_address) ? res.formatted_address : res.vicinity,
                location: res.geometry.location,
                locationType: res.geometry.location_type,
                placeId: res.place_id
            };
            res.address_components.forEach(function (addressComp) {
                if (addressComp.types.indexOf("country") !== -1) {
                    loc.country = addressComp.long_name
                }
                if (addressComp.types.indexOf("locality") !== -1) {
                    loc.city = addressComp.long_name
                }
                if (addressComp.types.indexOf("administrative_area_level_1") !== -1) {
                    loc.state = addressComp.long_name
                }
            });
            /*            var location = res.geometry.location.lat + "," + res.geometry.location.lng;
             getTimeZone({"location": location }, function (res){
             if (res){
             loc.timeZone = res;

             }
             });*/
            locationInfo.push(loc);
        });
        return locationInfo
    }
});

const getTimeZone = function (parameters, callback) {
    parameters.timestamp = 1331161200;
    googleExecuter(appConsts.GOOGLE_APIS.GET_TIME_ZONE_BY_LOCATION, parameters, function (response) {
        if (response.responseInfo && response.responseInfo.isErrorOccurred) {
            callback(response);
        }
        else if (response.responseData) {
            callback(prepareOutputForTimeZone(response.responseData));
        }
    });
};

const prepareOutputForTimeZone = function (result) {
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
    let hour = Math.floor(Math.abs(time));
    let min = Math.floor((Math.abs(time) * 60) % 60);
    return time < 0 ? "-" : "+" + (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + min;
};

module.exports = router;