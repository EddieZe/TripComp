/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';

var properties = require('./../infra/dataBase/dbProperties');
var logger = require('../infra/winstonLogger.js');
var reviewSch = require('../infra/schemas/ReviewSchema');
var connection = require('./../infra/dataBase/dbConnection');
var reviewMdl;

try {
    reviewMdl = connection.getConnection().model(properties.COL_REVIEWS, reviewSch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}

var getPlaceReviewsFromDB = function (placeId, callback) {
    reviewMdl.find({})
        .where('placeId').equals(placeId)
        .where('text').ne(null)
        .exec(function (err, res) {
            if (err) {
                logger.error('reviewServices.getNewSiteId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else if (res && res.length <= 0) {
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'No data Found.', errorData: err},
                    responseData: null
                });
            }
            else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: res
                });

            }
        });
};

var getPlaceRatingFromDB = function (placeId, callback) {
    reviewMdl.aggregate([
        {$match: {placeId: placeId}},
        {
            $group: {
                _id: '$placeId',
                avgRating: {$avg: '$rating'},
                numOfRatings: {$sum: 1}
            }
        }
    ], function (err, res) {
        if (err) {
            logger.error('reviewServices.getNewSiteId', err);
            callback({
                responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
            });
        }
        else if (res && res.length <= 0) {
            callback({
                responseInfo: {isErrorOccurred: true, responseMsg: 'No data Found.', errorData: err},
                responseData: null
            });
        }
        else {
            callback({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: res[0]
            });

        }
    });
};

var addNewPlaceReview = function (newReview, callback) {

    getNewReviewId(function (newId) {

        if (newId.responseInfo.isErrorOccurred) {
            callback(newId);
        }
        else {
            newReview.reviewId = newId.responseData;
            reviewMdl(newReview)
                .save(function (err, res) {
                    if (err) {
                        logger.error('reviewServices.addNewPlaceReview', err);
                        callback(null, {
                            responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                        });
                    }
                    else {
                        callback({
                            responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                            responseData: res
                        });
                    }
                });
        }
    });
};

function getNewReviewId(callback) {
    reviewMdl.findOne({})
        .select('reviewId').sort('-reviewId')
        .exec(function (err, reviewRes) {
            if (err) {
                logger.error('reviewServices.getNewCategoryId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else if (reviewRes == null) {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: parseInt(0)
                });
            }
            else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: parseInt(reviewRes.reviewId) + 1
                });
            }
        });
}

module.exports = {
    getPlaceReviewsFromDB: getPlaceReviewsFromDB,
    getPlaceRatingFromDB: getPlaceRatingFromDB,
    addNewPlaceReview: addNewPlaceReview
};