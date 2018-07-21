/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  15/05/2016
 */
'use strict';

const properties = require('./../infra/dataBase/dbProperties');
const logger = require('../infra/winstonLogger.js');
const linkTypeSch = require('../infra/schemas/linkTypeSchema');
const connection = require('./../infra/dataBase/dbConnection');

let linkTypeMdl;

try {
    linkTypeMdl = connection.getConnection().model(properties.COL_LINKS_TYPES, linkTypeSch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}


const getLinkTypesFromDB = function (callback) {
    linkTypeMdl.find({})
        .exec(function (err, linkTypesRes) {
            if (err) {
                logger.error('linkTypeServices.getLinkTypesFromDB', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            } else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: linkTypesRes
                });
            }
        });
};

const addLinkTypeToDB = function (newLink, callback) {
    linkTypeMdl.findOne({})
        .where('type').equals(newLink.type)
        .exec(function (err, queryRes) {
            if (err) {
                logger.error('LinkTypeServices.addNewLinkType', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            }
            if (queryRes != null) {
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Such Link Type already exist in the DB'}
                });
            }
            else {
                getLinkTypeId(function (newId) {
                    if (newId.responseInfo.isErrorOccurred) {
                        callback(newId);
                    }
                    else {
                        newLink.typeId = newId.responseData;
                        linkTypeMdl(newLink).save(function (err) {
                            if (err) {
                                logger.error('LinkTypeServices.addNewLinkType', err);
                                callback(null, {
                                    responseInfo: {
                                        isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err
                                    }
                                });
                            }
                            else {
                                callback({
                                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                                    responseData: newLink
                                });
                            }
                        });
                    }
                });
            }
        });
};

function getLinkTypeId(callback) {
    linkTypeMdl.findOne({})
        .select('typeId').sort('-typeId')
        .exec(function (err, linkTypeRes) {
            if (err) {
                logger.error('linkTypeServices.getLinkTypeId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            callback({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: parseInt(linkTypeRes.typeId) + 1
            });
        })
}

module.exports = {
    getLinkTypesFromDB: getLinkTypesFromDB,
    addLinkTypeToDB: addLinkTypeToDB
};