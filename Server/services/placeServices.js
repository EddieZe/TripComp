/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';

const properties = require('./../infra/dataBase/dbProperties');
const logger = require('../infra/winstonLogger.js');
const placeSch = require('../infra/schemas/PlaceSchema');
const connection = require('./../infra/dataBase/dbConnection');

let placeMdl;

try {
    placeMdl = connection.getConnection().model(properties.COL_PLACES, placeSch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}

const getPlacesFromDB = function (location, callback) {
    //updateSchema();
    let USA_ID = '1011';
    placeMdl.find({})
        .or([{'placeLevel': 1, 'location.countryId': location.country},
            {'location.countryId': USA_ID, 'placeLevel': 2, 'location.cityId': location.city},
            {'placeLevel': 3, 'location.cityId': location.city},
            {'placeLevel': 4, 'location.siteId': location.site}])
        .exec(function (err, docs) {
                if (err) {
                    logger.error('placeServices.getPlacesFromDB', err);
                    callback({
                        responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                        responseData: null
                    });
                }
                else if (docs.length <= 0) {
                    callback({
                        responseInfo: {
                            isErrorOccurred: true,
                            responseMsg: 'No data Found.',
                            errorData: err
                        },
                        responseData: null
                    });
                }
                else {
                    callback({
                        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                        responseData: docs
                    });
                }
            }
        );
};

const addNewPlaceToDB = function (newPlace, callback) {
    if (!newPlace.googleInfo || !newPlace.googleInfo.googlePlaceId) {
        newPlace.googleInfo = {googlePlaceId: null};
    }
    placeMdl.findOne({})
        .or([{'googleInfo.googlePlaceId': newPlace.googleInfo.googlePlaceId},
            {'name': newPlace.name, 'location.countryId': newPlace.location.countryId, 'location.cityId': newPlace.location.cityId}])
        .exec(function (err, queryRes) {
            if (err) {
                logger.error('placeServices.addNewPlaceToDB', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            }
            if (queryRes != null) {
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Such place already exist in the DB'}
                });
            }
            else {
                getNewPlaceId(function (res) {
                    newPlace.placeId = res;
                    if (newPlace.isImageSelected) {
                        newPlace.imgSource = [{
                            type: "LOCAL",
                            source: 'resources/images/places/' + newPlace.placeId + '_0.jpg'
                        }]
                    }
                    else {
                        newPlace.imgSource = [{
                            type: "LOCAL"
                        }]
                    }
                    if (newPlace.googleInfo.googlePlaceId === null) {
                        newPlace.googleInfo = undefined
                    }
                    placeMdl(newPlace)
                        .save(function (err, res) {
                            if (err) {
                                logger.error('placeServices.addNewPlaceToDB', err);
                                callback({
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
                });
            }
        });

};

const checkIsPlaceExists = function (location, placeName, googlePlaceId, callback) {
    placeMdl.findOne({})
        .or([{'googleInfo.googlePlaceId': googlePlaceId},
            {'name': placeName, 'location.countryId': location.countryId, 'location.cityId': location.cityId}])
        .exec(function (err, queryRes) {
            if (err) {
                logger.error('placeServices.addNewPlaceToDB', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            }
            if (queryRes === null) {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: {isPlaceExist: false}
                });
            }
            if (queryRes != null) {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: {isPlaceExist: true, placeLocation: queryRes.location}
                });
            }
        });
};

const addPlacePhotoSrc = function (placeId, newPlacePhotoSrc, callback) {
    placeMdl.findOne({'placeId': placeId}, function (err, place) {
        if (err) {
            logger.error('placeServices.findOneAndUpdate', err);
            callback({
                responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                responseData: null
            });
        }
        else if (place === null) {
            logger.error('placeServices.findOneAndUpdate', 'Place Id ' + placeId + ' was not found');
            callback({
                responseInfo: {isErrorOccurred: true, responseMsg: 'Place Id ' + placeId + ' was not found', errorData: err},
                responseData: null
            });
        }
        else {
            if (place.imgSource[0]) {
                if (place.imgSource[0].source === "images/placeIcon.jpg") {
                    place.imgSource[0].source = newPlacePhotoSrc.source;
                }
                else {
                    place.imgSource.push(newPlacePhotoSrc);
                }
            }
            else {
                place.imgSource.push(newPlacePhotoSrc);
            }
            placeMdl.findOneAndUpdate({'placeId': placeId}, {'imgSource': place.imgSource}, function (err) {
                if (err) {
                    logger.error('placeServices.findOneAndUpdate', err);
                    callback({
                        responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                        responseData: null
                    });
                }
                else {
                    callback({
                        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'}
                    });
                }
            });
        }
    })
};

const updatePlaceLinks = function (placeId, links, callback) {

    placeMdl.findOne({'placeId': placeId}, function (err, place) {
        if (err) {
            logger.error('placeServices.findOneAndUpdate', err);
            callback({
                responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                responseData: null
            });
        }
        else if (place === null) {
            logger.error('placeServices.findOneAndUpdate', 'Place Id ' + placeId + ' was not found');
            callback({
                responseInfo: {isErrorOccurred: true, responseMsg: 'Place Id ' + placeId + ' was not found', errorData: err},
                responseData: null
            });
        }
        else {
            links.forEach(function (link) {
                place.links.push(link);
            });
            placeMdl.findOneAndUpdate({'placeId': placeId}, {'links': place.links}, function (err) {
                if (err) {
                    logger.error('placeServices.findOneAndUpdate', err);
                    callback({
                        responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                        responseData: null
                    });
                }
                else {
                    callback({
                        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'}
                    });
                }
            });
        }
    });
    console.log("update links for placeId: " + placeId + " with the links: " + JSON.stringify(links));
};

function updateSchema() {
    placeMdl.find({})
        .exec(function (err, places) {
            if (err) {
                console.log('FUCK!');
            }
            else {
                places.forEach(function (place) {
                    let links = [];
                    let link = {};
                    if (place.siteURL) {
                        link = {
                            type: "siteURL",
                            name: "Web Site",
                            URL: place.siteURL
                        };
                        links.push(link);
                        place.siteURL = undefined;
                    }
                    if (place.tripAdvisorURL) {
                        link = {
                            type: "tripAdvisorURL",
                            name: "Trip Advisor",
                            URL: place.tripAdvisorURL
                        };
                        links.push(link);
                        place.tripAdvisorURL = undefined;
                    }
                    if (place.wikiURL) {
                        link = {
                            type: "wikiURL",
                            name: "Wikipedia",
                            URL: place.wikiURL
                        };
                        links.push(link);
                        place.wikiURL = undefined;
                    }
                    place.links = links;
                    placeMdl.findOneAndUpdate({'placeId': place.placeId}, place, function (err) {
                        if (err) {
                            console.log('Error');
                        }
                    });
                    placeMdl.findOneAndUpdate({'placeId': place.placeId}, {$unset: {siteURL: 1}}, function (err) {
                        if (err) {
                            console.log(err)
                        }
                        else (console.log("SUCCESS"));
                    });
                    placeMdl.findOneAndUpdate({'placeId': place.placeId}, {$unset: {tripAdvisorURL: 1}}, function (err) {
                        if (err) {
                            console.log(err)
                        }
                        else (console.log("SUCCESS"));
                    });
                    placeMdl.findOneAndUpdate({'placeId': place.placeId}, {$unset: {wikiURL: 1}}, function (err) {
                        if (err) {
                            console.log(err)
                        }
                        else (console.log("SUCCESS"));
                    });

                });
            }
        });
}

function getNewPlaceId(callback) {
    placeMdl.findOne({})
        .select('placeId').sort('-placeId')
        .exec(function (err, placeRes) {
            if (err) {
                logger.error('placeServices.getNewPlaceId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else {
                callback(parseInt(placeRes.placeId) + 1);
            }
        })

}

module.exports = {
    getPlacesFromDB: getPlacesFromDB,
    addNewPlaceToDB: addNewPlaceToDB,
    checkIsPlaceExists: checkIsPlaceExists,
    addPlacePhotoSrc: addPlacePhotoSrc,
    updatePlaceLinks: updatePlaceLinks
};