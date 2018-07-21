/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  23/11/2015
 */
'use strict';
const https = require('https');
const appConsts = require('../../infra/appConstsAndProperties');
const HttpResponseProcessor = require('./HttpResponseProcessor');
const querystring = require('querystring');
const logger = require('./../../infra/winstonLogger');

const executeCall = function (apiName, input, callback) {
    let parameters = input;
    let options;
    parameters.key = appConsts.KEY;

    if (appConsts.IS_BEHIND_PROXY) {
        options = {
            host: appConsts.PROXY_HOST,
            port: appConsts.PROXY_PORT,
            path: apiName + appConsts.OUTPUT_FORMAT + "?" + querystring.stringify(parameters),
            headers: {
                Host: appConsts.GOOGLE_HOST,
                Connection: appConsts.GOOGLE_CONNECTION,
                maxSockets: appConsts.GOOGLE_MAX_SOCKETS
            }
        };
    }
    else {
        options = {
            host: appConsts.GOOGLE_HOST,
            path: apiName + appConsts.OUTPUT_FORMAT + "?" + querystring.stringify(parameters)
        };
    }

    https.request(options, new HttpResponseProcessor(appConsts.OUTPUT_FORMAT === "json", function (err, googleRes) {
        if (googleRes) {
            if (googleRes.status === appConsts.GOOGLE_STATUS.OK || googleRes.status === appConsts.GOOGLE_STATUS.NOT_FOUND || googleRes.status === appConsts.GOOGLE_STATUS.ZERO_RESULTS) {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: googleRes
                });
            }
            else if (googleRes.status === appConsts.GOOGLE_STATUS.INVALID_REQUEST) {
                logger.error('googleRestExecuter.executeCall', "Error massage: The request is not correct, Google status: " + googleRes.status);
                callback({responseInfo: {isErrorOccurred: true, responseMsg: "The request is not correct", googleStatus: googleRes.status}});
            }
            else if (googleRes.status === appConsts.GOOGLE_STATUS.OVER_QUERY_LIMIT) {
                logger.error('googleRestExecuter.executeCall', "You have reached the maximum google request per day. Google status: " + googleRes.status);
                callback({responseInfo: {isErrorOccurred: true, responseMsg: "You have reached the maximum google request per day.", googleStatus: googleRes.status}});
            }
            else if (googleRes.status === appConsts.GOOGLE_STATUS.REQUEST_DENIED) {
                logger.error('googleRestExecuter.executeCall', "The request was denied, please check google error massage, Google status: " + googleRes.status + " Google error massage: " + googleRes.error_message);
                callback({responseInfo: {isErrorOccurred: true, responseMsg: "The request was denied, please check google error massage", googleStatus: googleRes.status, googleErrMsg: googleRes.error_message}});
            }
            else {
                logger.error('googleRestExecuter.executeCall', "General error occurred, please check google error massage, Google status: " + googleRes.status + " Google error massage: " + googleRes.error_message);
                callback({responseInfo: {isErrorOccurred: true, responseMsg: "General error occurred, please check google error massage", googleErrMsg: googleRes.error_message}});
            }
        }
    })).on('socket', function (socket){
        socket.setTimeout(appConsts.GOOGLE_TIMEOUT, function() {
            logger.error('Timeout of rest')
        });
    }).on('error', function (err) {
        logger.error('googleRestExecuter.executeCall', err);
        callback({responseInfo: {isErrorOccurred: true, responseMsg: err}});
    }).end();

};

module.exports = executeCall;