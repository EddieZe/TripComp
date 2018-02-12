/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  10/12/2016
 */
'use strict';

define(['./srvModule'], function (module) {
    var searchAddresses = module.service('searchAddresses', ['$http', function ($http) {
        this.searchAddresses = function (input, callback) {
            var responseInfo = {};
            $http({
                timeout: 60000,
                method: 'POST',
                url: '/google/getGeocodeByAddress',
                data: {
                    address: input
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
                        callback({responseInfo : {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data}});
                    }
                });
        };
    }]);
    return searchAddresses;
});