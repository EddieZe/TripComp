/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';
var properties = require('./../infra/dataBase/dbProperties');
var logger = require('../infra/winstonLogger.js');
var siteSch = require('../infra/schemas/SiteSchema');
var connection = require('./../infra/dataBase/dbConnection');
var siteMdl;

try {
    siteMdl = connection.getConnection().model(properties.COL_SITES, siteSch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}

var getSitesFromDB = function (callback) {

    siteMdl.find({})
        .exec(function (err, countryRes) {
            if (err) {
                logger.error('siteServices.getSitesFromDB', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            }
            else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: countryRes
                });
            }
        })
};

var getSiteInfoFromDB = function (loc, callback) {

    siteMdl.findOne({})
        .select('name cities.cityName cities.cityId cities.sites.siteName cities.sites.siteId')
        .where('countryId').equals(loc.countryId)
        .where('cities.cityId').equals(loc.cityId)
        .exec(function (err, res) {
            if (err) {
                logger.error('siteServices.getNewSiteId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else {
                var output = {countryName: res.name};
                res.cities.forEach(function(city) {
                    if (city.cityId === loc.cityId){
                        output.cityName = city.cityName;
                        city.sites.forEach(function(site){
                            if (site.siteId === loc.siteId){
                                output.siteName = site.siteName;
                                callback({
                                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                                    responseData: output
                                });
                            }
                        });
                    }
                });
            }
        });
};

var addSiteToDB = function (siteToAdd, callback) {

    siteMdl.find({name: siteToAdd.name})
        .exec(function (err, docs) {
                if (err) {
                    logger.error('siteServices.addSiteToDB', err);
                    callback({
                        responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                        responseData: null
                    });
                }
                else if (docs.length == 0) {
                    getNewCountryId(function (newSiteId) {
                        if (newSiteId.responseInfo.isErrorOccurred) {
                            callback(newSiteId);
                        }
                        else {
                            siteToAdd.countryId = newSiteId.responseData;
                            siteToAdd.cities[0].cityId = newSiteId.responseData + '00';
                            siteToAdd.cities[0].sites[0].siteId = newSiteId.responseData + '000';
                            if (siteToAdd.isImageSelected) {
                                siteToAdd.cities[0].sites[0].imgSource = 'resources/images/sitesFrontView/' + siteToAdd.cities[0].sites[0].siteId + '_' + siteToAdd.cities[0].sites[0].siteName + '_0.jpg';
                            }
                            var site = new siteMdl(siteToAdd);
                            site.save(function (err) {
                                if (err) {
                                    logger.error('siteServices.addSiteToDB', err);
                                    callback({
                                        responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                                        responseData: null
                                    });
                                }
                                else {
                                    var response = {siteId: siteToAdd.cities[0].sites[0].siteId, siteName: siteToAdd.cities[0].sites[0].siteName};
                                    callback({
                                        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                                        responseData: response
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    siteMdl.findOne({})
                        .where('name').equals(siteToAdd.name)
                        .where('cities.cityName').equals(siteToAdd.cities[0].cityName)
                        .exec(function (err, queryRes) {
                                if (err) {
                                    logger.error('siteServices.addSiteToDB', err);
                                    callback({
                                        responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                                        responseData: null
                                    });
                                }
                                if (queryRes == null) {
                                    // -------------------- if need to add new City ----------------------------
                                    getNewCityId(siteToAdd.name, function (newCityId) {
                                        if (newCityId.responseInfo.isErrorOccurred) {
                                            callback(newCityId);
                                        }
                                        else {
                                            siteToAdd.cities[0].cityId = newCityId.responseData;
                                            siteToAdd.cities[0].sites[0].siteId = newCityId.responseData + '0';
                                            if (siteToAdd.isImageSelected) {
                                                siteToAdd.cities[0].sites[0].imgSource = 'resources/images/sitesFrontView/' + siteToAdd.cities[0].sites[0].siteId + '_' + siteToAdd.cities[0].sites[0].siteName + '_0.jpg';
                                            }
                                            siteMdl.findById(docs[0]._id, function (err, countryToUpdate) {
                                                siteMdl.update({_id: countryToUpdate._id}, {$push: {'cities': siteToAdd.cities[0]}}, function (err, numAffected, rawResponse) {
                                                    if (err) {
                                                        logger.error('siteServices.addSiteToDB', err);
                                                        callback({
                                                            responseInfo: {
                                                                isErrorOccurred: true,
                                                                responseMsg: 'Error Occurred',
                                                                errorData: err
                                                            },
                                                            responseData: null
                                                        });
                                                    }
                                                    else {
                                                        var response = {siteId: siteToAdd.cities[0].sites[0].siteId, siteName: siteToAdd.cities[0].sites[0].siteName};
                                                        callback({
                                                            responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                                                            responseData: response
                                                        });
                                                    }
                                                });
                                            });
                                        }

                                    });
                                }

                                else {
                                    // -------------------- if need to add only new site ----------------------------
                                    getNewSiteId(siteToAdd.name, siteToAdd.cities[0].cityName, function (newSiteId) {
                                        if (newSiteId.responseInfo.isErrorOccurred) {
                                            callback(newSiteId);
                                        }
                                        else {
                                            siteToAdd.cities[0].sites[0].siteId = newSiteId.responseData;
                                            if (siteToAdd.isImageSelected) {
                                                siteToAdd.cities[0].sites[0].imgSource = 'resources/images/sitesFrontView/' + siteToAdd.cities[0].sites[0].siteId + '_' + siteToAdd.cities[0].sites[0].siteName + '_0.jpg';
                                            }
                                            queryRes.cities.forEach(function(city){
                                                if (city.cityName == siteToAdd.cities[0].cityName) {
                                                    city.sites.push(siteToAdd.cities[0].sites[0])
                                                }
                                            });
                                            siteMdl.findOneAndUpdate({
                                                name: siteToAdd.name
                                            }, queryRes, {upsert: false}, function (err, doc) {
                                                if (err) {
                                                    logger.error('siteServices.addSiteToDB', err);
                                                    callback({
                                                        responseInfo: {
                                                            isErrorOccurred: true,
                                                            responseMsg: 'Error Occurred',
                                                            errorData: err
                                                        },
                                                        responseData: null
                                                    });
                                                }
                                                else {
                                                    var response = {siteId: siteToAdd.cities[0].sites[0].siteId, siteName: siteToAdd.cities[0].sites[0].siteName};
                                                    callback({
                                                        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                                                        responseData: response
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        )
                }
            }
        );

};

function updateSitePhotoSrc(siteId, newSitePhotoSrc, callback) {
    siteMdl.findOne({'cities.sites.siteId': siteId}, function (err, queryRes) {
        queryRes.cities.forEach(function (cityEl) {
            cityEl.sites.forEach(function (siteEl) {
                if (siteEl.siteId == siteId) {
                    siteEl.imgSource = newSitePhotoSrc;
                    siteMdl.findOneAndUpdate({countryId: queryRes.countryId}, queryRes, {upsert: false}, function (err, res) {
                        if (err) {
                            logger.error('siteServices.findOneAndUpdate', err);
                            callback({
                                responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                                responseData: null
                            });
                        }
                        else {
                            logger.debug('updateSitePhotoSrc.post', 'Success');
                            callback({
                                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'}
                            });
                        }
                    });
                }
            });
        });
    });
}

function getNewCountryId(callback) {

    siteMdl.findOne({})
        .select('countryId').sort('-countryId')
        .exec(function (err, countryRes) {
            if (err) {
                logger.error('siteServices.getNewCountryId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: parseInt(countryRes.countryId) + 1
                });
            }
        })
}

function getNewCityId(countryName, callback) {

    siteMdl.findOne({})
        .select('cities.cityId')
        .where('name').equals(countryName)
        .exec(function (err, res) {
            if (err) {
                logger.error('siteServices.getNewCityId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else {
                var lastId = 0;
                var cities = res.cities;
                cities.forEach(function (el) {
                    if (parseInt(el.cityId) > lastId) {
                        lastId = parseInt(el.cityId);
                    }
                });
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: lastId + 1
                });
            }
        })
}

function getNewSiteId(countryName, cityName, callback) {

    siteMdl.find({})
        .select('cities.cityName cities.sites.siteId')
        .where('name').equals(countryName)
        .where('cities.cityName').equals(cityName)
        .exec(function (err, res) {
            if (err) {
                logger.error('siteServices.getNewSiteId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            else {
                var lastId = 0;
                var sites = 0;
                res[0].cities.forEach(function(city){
                    if (city.cityName === cityName) {
                        sites = city.sites;
                        return;
                    }
                });
                sites.forEach(function(site){
                    if (parseInt(site.siteId) > lastId) {
                        lastId = parseInt(site.siteId);
                    }
                });

                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: lastId + 1
                });

            }
        })

}

module.exports = {
    getSitesFromDB: getSitesFromDB,
    addSiteToDB: addSiteToDB,
    getSiteInfoFromDB: getSiteInfoFromDB,
    updateSitePhotoSrc: updateSitePhotoSrc
};