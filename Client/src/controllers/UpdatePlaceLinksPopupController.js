/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  11/05/2016
 */
'use strict';

define(['./ctrlModule'], function (module) {
    var updatePlaceLinksPopupController = module.controller('UpdatePlaceLinksPopupController', function ($scope, updatePlaceLinks, showMessage, $uibModalInstance) {

        var updateLinksInput = {};
        var massage;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.updateLinks = function () {
            prepareInput();
            if(updateLinksInput.links.length === 0){
                massage = "Please enter web site to add";
                showMessage.showError(massage);
            }
            else{
                updatePlaceLinks.updatePlaceLinks(updateLinksInput, function (res) {
                    if(res.isErrorOccurred){
                        $uibModalInstance.close();
                        massage = "Application Error, please contact the admin";
                        showMessage.showError(massage);
                    }
                    else{
                        $uibModalInstance.close();
                        massage = "The links were updated";
                        showMessage.showMessage(massage);
                        updateLinksInput.links.forEach(function(link){
                            $scope.place.links.push(link);
                        });
                    }

                });
            }
        };

        var prepareInput = function () {
            var placeLinksToUpdate = [];
            $scope.links.forEach(function (link) {
                if (link.url) {
                    var newLink = {};
                    newLink.URL = link.url;
                    newLink.type = link.type.type;
                    newLink.name = link.type.name;
                    placeLinksToUpdate.push(newLink);
                }
            });
            updateLinksInput.placeId = $scope.place.placeId;
            updateLinksInput.links = placeLinksToUpdate;
        };
    });
    return updatePlaceLinksPopupController;
});
