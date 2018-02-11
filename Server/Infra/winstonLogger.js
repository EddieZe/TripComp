/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 29 - Jun - 2015
 */
'use strict';

var os = require('os');
var winston = require('winston');
var appConsts = require('./appConstsAndProperties');

var debug_Status = {
    START: 'START',
    END: 'END'
};

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'node_log',
            filename: './logs/NodeJSLogger.log',
            json: false,
            prettyPrint: true,
            formatter: formatter
        })/*,
         new (winston.transports.File)({
         name: 'req_res_log',
         filename: './logs/req_resLogger.log',
         json: false,
         formatter: formatter
         })*/
    ],
    exitOnError: false
});

function debug(path, status) {
    if (appConsts.IS_LOGGER_ON) {
        logger.info(path + ' - ' + status);
    }
}

function info(path, msg) {
    if (appConsts.IS_LOGGER_ON) {
        logger.info(path + ' - ' + msg);
    }
}

function error(path, err) {
    if (appConsts.IS_LOGGER_ON) {
        logger.error(path + ' - ' + err);
    }
}

function formatter(args) {

    var nowDate = new Date();
    var date = nowDate.toLocaleDateString() + ' ' + nowDate.toLocaleTimeString() + ' ' + nowDate.getMilliseconds();
    return '<<' + args.level.toUpperCase() + '>> <<' + date + '>> <<' + os.hostname() + '>> ' + args.message;

}

module.exports = {
    debug: debug,
    info: info,
    error: error,
    debug_Status: debug_Status
};

/*
 ====== Examples for calls===========
 logger.debug('getCountries.get',logger.debug_Status.START);
 logger.info('getCountries.get','Test');
 logger.error('getCountries.getFromFile',err);
 */
