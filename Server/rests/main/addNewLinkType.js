/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  23/08/2016
 */
'use strict';

const express = require('express');
const router = express.Router();
const linkTypeSrv = require('./../../services/linkTypeServices');
const logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('addNewLinkType.post', logger.debug_Status.START);
    if (validateInput(req.body.link)){
        execute(req.body.link, function(output){
            res.send(output);
        });
    }
    else{
        res.send({
            responseInfo: {isErrorOccurred: true, responseMsg: 'Mandatory fields are missing'}
        });
    }
});

const validateInput = function(input){
    return input.type && input.name
};

function execute(input,callback){
    linkTypeSrv.addLinkTypeToDB(input, function (dbRes) {
        if (!dbRes.responseInfo.isErrorOccurred) {
            logger.debug('New Link Type was added: linkId:' + dbRes.responseData.typeId + ' link type name: ' + dbRes.responseData.name, logger.debug_Status.END);
        }
        callback(dbRes);
    })
}

module.exports = router;