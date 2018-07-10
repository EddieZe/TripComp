/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  11/05/2016
 */
'use strict';

define(['./srvModule'], function (module) {
    var updatePlaceLinks = module.service('updatePlaceLinks', ['$http', function ($http) {
        this.updatePlaceLinks = function (input, callback) {
            var responseInfo = {};
            if (input.links.length === 0) {
                responseInfo = {
                    isErrorOccurred: true,
                    responseMsg: "Nothing to update for customer: " + input.placeId,
                    errorData: status
                };
                console.log(responseInfo.responseMsg);
                callback(responseInfo);
            }
            else {
                $http({
                    timeout: 60000,
                    method: 'POST',
                    url: '/updatePlaceLinks',
                    data: input,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status) {
                        if (data.responseInfo.isErrorOccurred) {
                            console.log(data.responseInfo.responseMsg);
                        }
                        else {
                            callback(data);
                        }
                    })
                    .error(function (data, status) {
                        if (status === 0 || status === 404 || status === -1) {
                            responseInfo = {
                                isErrorOccurred: true,
                                responseMsg: 'Can\'t reach the server, please contact the Administrator',
                                errorData: status
                            };
                            console.log(responseInfo.responseMsg);
                            callback(responseInfo);
                        }
                        else {
                            responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data};
                            console.log(responseInfo.responseMsg + responseInfo.errorData);
                            callback(responseInfo);
                        }
                    });
            }
        }
    }]);
    return updatePlaceLinks;
});