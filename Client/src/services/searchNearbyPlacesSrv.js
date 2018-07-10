/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  24/11/2015
 */
'use strict';

define(['./srvModule'], function (module) {
    var searchNearbyPlaces = module.service('searchNearbyPlaces', ['$http', function ($http) {
        this.searchNearbyPlaces = function (input, callback) {
            var responseInfo = {};
            $http({
                timeout: 60000,
                method: 'POST',
                url: '/google/searchNearByPlaces',
                data: {
                    location: input.location.lat + "," + input.location.lng,
                    radius: input.radius,
                    keyword: input.keyWord
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data && data.responseInfo && data.responseInfo.isErrorOccurred) {
                        console.log(data.responseInfo.responseMsg);
                        callback({responseInfo : {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        }});
                    }
                    else {
                        callback(data);
                    }
                })
                .error(function (data, status) {
                    if (status === 0 || status === 404) {
                        callback({responseInfo : {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        }});
                    }
                    else {
                        callback({responseInfo : {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data}});
                    }
                });
        };
    }]);
    return searchNearbyPlaces;
});