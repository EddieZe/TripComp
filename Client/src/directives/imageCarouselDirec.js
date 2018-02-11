/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  26/01/2016
 */
'use strict';

define(['./direcModule'], function (module) {
    var imageCarousel = module.directive('imageCarousel', function () {
        return {
            restrict: 'AEC',
            controller: 'ImageCarouselController',
            scope: {
                imageSources: '='
            },
            templateUrl: '../../templates/imageCarousel.html'
        }
    });
    return imageCarousel;
});