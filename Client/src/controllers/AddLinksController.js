/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  08/05/2016
 */
'use strict';

define(['./ctrlModule'], function (module) {
    var addLinksController = module.controller('addLinksController', function ($scope, getLinksTypes) {

        var links = [];
        $scope.links = [{}];
        $scope.linksOpt = undefined;

        getLinksTypes.getLinksTypes(function(res){
            $scope.linksOpt = res.responseData;
        });

        $scope.addLink = function () {
            $scope.links.push({});
        };

        $scope.deleteLink = function (index) {
            if ($scope.links.length > 1) {
                $scope.links.splice(index, 1);
            }
        };
    });

    return addLinksController
});
