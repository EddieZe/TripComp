/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 27-Oct-2015
 */
'use strict';

const express = require('express');
const router = express.Router();
const reviewSrv = require('./../../services/reviewServices');
const logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('addNewPlaceReview.post', logger.debug_Status.START);
    let input = req.body;
    if (validateInput(input)) {
        let review = {
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

const validateInput = function (input) {
    return input && input.placeId && input.authorName
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