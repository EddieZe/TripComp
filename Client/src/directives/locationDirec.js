/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  02/11/2015
 */
'use strict';

define(['./direcModule'], function (module) {
    var selectLoaction = module.directive('selectLoaction', function () {
        return {
            restrict: 'AEC',
            controller: 'locationController',
            scope: {
                siteLoc: '=loc'
            },
            templateUrl: '../../templates/locationTab.html'
        }
    });
    return selectLoaction;
});