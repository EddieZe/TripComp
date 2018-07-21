/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 24-Jul-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const logger = require('./../../infra/winstonLogger.js');
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

router.post('/', multipartyMiddleware, function (req, res) {
    let file = req.files.file;
    let targetPath = req.body.newPhotoSrc.source + file.name;
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