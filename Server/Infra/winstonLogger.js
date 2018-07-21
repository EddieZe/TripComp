/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 29 - Jun - 2015
 */
'use strict';

const os = require('os');
const winston = require('winston');
const appConsts = require('./appConstsAndProperties');

const debug_Status = {
    START: 'START',
    END: 'END'
};

const logger = new (winston.Logger)({
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

    const nowDate = new Date();
    const date = nowDate.toLocaleDateString() + ' ' + nowDate.toLocaleTimeString() + ' ' + nowDate.getMilliseconds();
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
