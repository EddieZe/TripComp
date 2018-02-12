/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Oct-2015
 */
'use strict';

var express = require('express');
var router = express.Router();
var reviewSrv = require('./../../services/reviewServices');
var logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('addNewPlaceReview.post', logger.debug_Status.START);
    var input = req.body;
    if (validateInput(input)) {
        var review = {
            "placeId": input.placeId,
            "authorName": input.authorName,
            "text": input.text
        };
        if (input.rating) {
            review.rating = input.rating
        }
        execute(review, function (output) {
            res.send(output);
        });
    }
    else {
        res.send({
            responseInfo: {isErrorOccurred: true, responseMsg: 'Mandatory fields are missing'}
        });
    }
});

var validateInput = function (input) {
    return input && input.placeId && input.authorName ? true : false;
};

function execute(input, callback) {
    reviewSrv.addNewPlaceReview(input, function (dbRes) {
        if (!dbRes.responseInfo.isErrorOccurred) {
            logger.debug('New Review was added: placeId:' + input.placeId + ' authorName: ' + input.authorName + ' Rating: ' + input.rating + ' review: ' + input.text, logger.debug_Status.END);
        }
        callback(dbRes);
    });
}

module.exports = router;