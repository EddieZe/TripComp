/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  30/11/2015
 */
'use strict';

define(['./srvModule'], function (module) {
    var checkAndGetPlaceInfoSrv = module.service('checkAndGetPlaceInfoSrv', ['$http', function ($http) {
        this.checkAndGetPlaceInfo = function (input, callback) {
            var responseInfo = {};
            $http({
                timeout: 60000,
                method: 'POST',
                url: '/google/checkAndGetPlaceInfo',
                data: input,
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data && data.responseInfo && data.responseInfo.isErrorOccurred) {
                        callback(data);
                    }
                    else {
                        callback(data);
                    }
                })
                .error(function (data, status) {
                    if (status === 0 || status === 404) {
                        callback({
                            responseInfo: {
                                isErrorOccurred: true,
                                responseMsg: 'Can\'t reach the server, please contact the Administrator',
                                errorData: status
                            }
                        });
                    }
                    else {
                        callback({responseInfo: {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data}});
                    }
                });
        };

    }]);
    return checkAndGetPlaceInfoSrv;
});