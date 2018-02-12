/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  26/01/2016
 */
'use strict';

define(['./ctrlModule'], function (module) {

    var imageCarouselController = module.controller('ImageCarouselController', function ($scope) {

        $scope.myInterval = 2500;
        $scope.noWrapSlides = false;
        var slides = $scope.slides = [];
        var currIndex = 0;

        if ($scope.imageSources) {
            $scope.imageSources.forEach(function (img) {
                slides.push({
                    image: img.source,
                    id: currIndex++
                });
            });
        }
    });

    return imageCarouselController;
});