/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  08/05/2016
 */
'use strict';

define(['./direcModule'], function (module) {
    var addLinks = module.directive('addLinks', function () {
        return {
            restrict: 'AEC',
            controller: 'addLinksController',
            scope: {
                links: '='
            },
            templateUrl: '../../templates/addLinks.html'
        }
    });
    return addLinks;
});