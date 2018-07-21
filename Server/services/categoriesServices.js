/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';

const properties = require('./../infra/dataBase/dbProperties');
const logger = require('../infra/winstonLogger.js');
const categorySch = require('../infra/schemas/CategorySchema');
const connection = require('./../infra/dataBase/dbConnection');

let categoryMdl;

try {
    categoryMdl = connection.getConnection().model(properties.COL_CATEGORIES, categorySch.getSchema());
}
catch (err) {
    console.log('error: ' + err);
}

const getCategoriesFromDB = function (callback) {

    categoryMdl.find({})
        .exec(function (err, categoriesRes) {
            if (err) {
                logger.error('CategoriesServices.getCategoriesFromDB', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            } else {
                callback({
                    responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                    responseData: categoriesRes
                });
            }
        });
};

const addNewCategory = function (newCategory, callback) {

    categoryMdl.findOne({})
        .where('categoryName').equals(newCategory.categoryName)
        .exec(function (err, queryRes) {
            if (err) {
                logger.error('CategoriesServices.addNewCategory', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err},
                    responseData: null
                });
            }
            if (queryRes != null) {
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Such Category already exist in the DB'}
                });
            }
            else {
                getNewCategoryId(function (newId) {
                    if (newId.responseInfo.isErrorOccurred) {
                        callback(newId);
                    }
                    else {
                        newCategory.categoryId = newId.responseData;
                        categoryMdl(newCategory)
                            .save(function (err, res) {
                                if (err) {
                                    logger.error('CategoriesServices.addNewCategory', err);
                                    callback(null, {
                                        responseInfo: {
                                            isErrorOccurred: true,
                                            responseMsg: 'Error Occurred',
                                            errorData: err
                                        }
                                    });
                                }
                                else {
                                    callback({
                                        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                                        responseData: null
                                    });
                                }
                            });
                    }
                });
            }
        });

};

function getNewCategoryId(callback) {
    categoryMdl.findOne({})
        .select('categoryId').sort('-categoryId')
        .exec(function (err, categoryRes) {
            if (err) {
                logger.error('CategoriesServices.getNewCategoryId', err);
                callback({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err}
                });
            }
            callback({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: parseInt(categoryRes.categoryId) + 1
            });
        })
}

module.exports = {
    getCategoriesFromDB: getCategoriesFromDB,
    addNewCategory: addNewCategory
};