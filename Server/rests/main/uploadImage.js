/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 24-Jul-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var logger = require('./../../infra/winstonLogger.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

router.post('/', multipartyMiddleware, function (req, res) {
    var file = req.files.file;
    var targetPath = req.body.newPhotoSrc.source + file.name;
    fs.rename(file.path, targetPath, function (err) {
        if (err) {
            if (err.errno === -4048) {
                res.send({
                    responseInfo: {isErrorOccurred: true, responseMsg: "File with that name is already exists."},
                    responseData: null
                });
            }
            else {
                res.send({
                    responseInfo: {isErrorOccurred: true, responseMsg: err},
                    responseData: null
                });
            }
        }
        else {
            logger.debug('uploadSiteImage.post', logger.debug_Status.START);
            logger.debug('Image was saved as:' + req.body.newPhotoSrc.source, logger.debug_Status.END);
            res.send({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: null
            });
        }
    });


})
;

module.exports = router;