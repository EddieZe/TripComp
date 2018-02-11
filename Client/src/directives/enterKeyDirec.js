/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  27/11/2015
 */
'use strict';

define(['./direcModule'], function (module) {
    var ngEnter = module.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
    return ngEnter;
});