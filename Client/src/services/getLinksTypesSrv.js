/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  11/05/2016
 */
'use strict';

define(['./srvModule'], function (module) {
    var getLinksTypes = module.service('getLinksTypes', ['$http', function ($http) {
        this.getLinksTypes = function (callback) {
            var responseInfo = {};
            $http.get('/getLinksTypes')
                .success(function (data, status) {
                    if (data.responseInfo.isErrorOccurred) {
                        console.log(data.responseInfo.responseMsg);
                    }
                    else {
                        callback(data);
                    }
                })
                .error(function (data, status) {
                    if (status === 0 || status === 404) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        console.log(responseInfo.responseMsg);
                    }
                    else {
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data};
                        console.log(responseInfo.responseMsg + responseInfo.errorData);
                    }
                });
        };
    }]);
    return getLinksTypes;
});