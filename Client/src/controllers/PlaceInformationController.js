/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./ctrlModule'], function (module) {
    var placeInformationController = module.controller('PlaceInformationController', function ($scope, $http, $location, $route, $uibModalInstance, place, $sce, fileUpload, Upload, $timeout, $uibModal, showMessage) {

        var googleAPIToken = 'AIzaSyC5OiqUQQYgdW7UtyRugpEKHWQN5GknOQE';

        var responseInfo = {};

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

        $scope.newReview = {};

        $scope.isSubmited = false;

        $scope.place = place;

        $scope.isPhotoExist = $scope.place.mainPhoto != 'resources/images/placeIcon.jpg';

        var activeTab = null;
        $('a[data-toggle="tab"]').on('shown', function (e) {
            activeTab = e.target;
        });

        $scope.isLocationExist =
            place &&
            place.googleInfo &&
            place.googleInfo.locationInfo &&
            place.googleInfo.locationInfo.lat &&
            place.googleInfo.locationInfo.lat != 0 &&
            place.googleInfo.locationInfo.lng &&
            place.googleInfo.locationInfo.lng != 0;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.updateTab = function (tab) {
            switch (tab) {
                case 'generalTab':
                    if (!$scope.isPhotoExist) {
                        $('#addPhotoBtn').show()
                    }
                    else {
                        $('#addPhotoBtn').hide()
                    }
                    $('#addLinkBtn').show();
                    break;
                case 'photoTab':
                    $('#addPhotoBtn').show();
                    $('#addLinkBtn').hide();
                    break;
                case 'ratingTab':
                    $('#addPhotoBtn').hide();
                    $('#addLinkBtn').hide();
                    break;
            }
        };

        $scope.init = function () {
            if (place.placeRating) {
                $scope.placeRating = parseFloat(place.placeRating.avgRating).toFixed(1);
                $scope.numOfRatings = place.placeRating.numOfRatings;
            }
            $scope.getReviews();
            populateLinks();
            if (place && place.updated_at) {
                place.updated_at = place.updated_at.toLocaleString();
            }
            $scope.updateTab('generalTab');
        };

        $scope.getIframeSrc = function (place) {
            if (place.googleInfo.googlePlaceId) {
                return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=place_id:' + place.googleInfo.googlePlaceId);
            }
            else if ($scope.isLocationExist) {
                return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=' + place.googleInfo.locationInfo.lat + ',' + place.googleInfo.locationInfo.lng);
            }
        };

        function populateLinks() {
            var links = [];
            var link = {}
            if (place.siteURL) {
                link = {
                    type: "siteURL",
                    name: "Web Site",
                    URL: place.siteURL
                };
                links.push(link);
            }
            if (place.tripAdvisorURL) {
                link = {
                    type: "tripAdvisorURL",
                    name: "Trip Advisor",
                    URL: place.tripAdvisorURL
                };
                links.push(link);
            }
            if (place.wikiURL) {
                link = {
                    type: "wikiURL",
                    name: "Wikipedia",
                    URL: place.wikiURL
                };
                links.push(link);
            }
            if (links.length > 0) {
                place.links = links;
            }
        };

        $scope.getReviews = function () {
            $http({
                method: 'POST',
                url: '/getPlaceReviews',
                data: {placeId: place.placeId},
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        //Error Occurred
                    }
                    else {
                        $scope.placeReviews = data.responseData;
                    }
                })
                .error(function (err, status) {
                    if (status == 0) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        //Error Occurred
                    }
                    else {
                        console.log(err);
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err};
                        //Error Occurred
                    }
                });
        };

        function addPlacePhotoSrc(imageInfo) {
            $http({
                method: 'POST',
                url: '/addPlacePhotoSrc',
                data: {
                    "placeId": imageInfo.id,
                    "newPlacePhotoSrc": {
                        type: "LOCAL",
                        source: 'resources/images/places/' + imageInfo.imageName
                    }
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        $scope.place.imgSource.push({
                            type: "LOCAL",
                            source: 'resources/images/places/' + imageInfo.imageName
                        });
                        $uibModalInstance.close();
                        showMessage.showMessage('The place photo was added');
                    }
                })
                .error(function (data, status) {
                    if (status == 0) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        showMessage.showError(responseInfo.responseMsg);
                    }
                    else {

                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: data};
                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
                    }
                });
        };

        $scope.uploadFiles = function () {
            var fileName;
            if (place.imgSource.length === 1 && place.imgSource[0].source === "images/placeIcon.jpg") {
                fileName = $scope.place.placeId + '_0.jpg'
            }
            else {
                fileName = $scope.place.placeId + '_' + place.imgSource.length + '.jpg'
            }

            var placeImageInfo = {
                id: $scope.place.placeId,
                photoStruct: {
                    type: "LOCAL",
                    source: 'Client/resources/images/places/'
                },
                imageName: fileName
            };

            fileUpload.uploadFileToUrl($scope.placePhoto, "/uploadImage", placeImageInfo, function (resp) {
                if (resp.responseInfo.isErrorOccurred === true) {
                    var massage = "Was not able to upload the image";
                    showMessage.showError(massage);
                }
                else {
                    addPlacePhotoSrc(placeImageInfo);
                }
            });
        };

        $scope.updateRatingView = function (data) {
            place.placeRating = place.placeRating ? {
                avgRating: ((place.placeRating.avgRating * place.placeRating.numOfRatings + data.rating) / (place.placeRating.numOfRatings + 1)),
                numOfRatings: place.placeRating.numOfRatings + 1
            } : {
                avgRating: data.rating,
                numOfRatings: 1
            };
        };

        $scope.addNewReview = function () {
            $scope.newReview.placeId = place.placeId;

            $http({
                method: 'POST',
                url: '/addNewPlaceReview',
                data: $scope.newReview,
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        //Error Occurred
                    }
                    else {
                        $scope.isSubmited = true;
                        $scope.newReview.rating = undefined;
                        $scope.newReview.authorName = undefined;
                        $scope.newReview.text = undefined;
                        $scope.updateRatingView(data.responseData);
                        $scope.init();
                    }


                })
                .error(function (err, status) {
                    if (status == 0) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        //Error Occurred
                    }
                    else {
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occurred', errorData: err};
                        //Error Occurred
                    }
                });

        };

        $scope.addLinks = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'updateLinksPopup.html',
                controller: 'UpdatePlaceLinksPopupController',
                size: 'md',
                scope: $scope,
                backdrop: 'static',
                keyboard: false
            });
        }
    });
    return placeInformationController;
});