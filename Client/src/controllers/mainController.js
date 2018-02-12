/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./ctrlModule'], function (module) {
    var mainController = module.controller('mainController', function ($scope, $uibModal, $route, $http, $sce, showMessage, fileUpload, Upload) {

        var googleAPIToken = 'AIzaSyC5OiqUQQYgdW7UtyRugpEKHWQN5GknOQE';
        var responseInfo = {};
        var categoriesList;
        var newPeriod = 1000 * 60 * 60 * 24 * 14;

        $scope.getIframeSrc = function (site) {
            if (site) {
                if (site.googleInfo.lat === '0' || site.googleInfo.lng === '0') {
                    $scope.siteLocation.site.isHasCord = false;
                }
                else {
                    $scope.siteLocation.site.isHasCord = true;
                    return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=' + site.googleInfo.lat + ',' + site.googleInfo.lng);
                }
            }
        };

        $scope.initPage = function () {

            $scope.isCollapsed = true;
            $scope.isTableFilled = false;
            $scope.isSitePhotoLoaded = true;

            $scope.$watch('siteLocation.site', function (newCountry) {
                $scope.clearCurrSite();
            });

            $http.get('/getCategories')
                .success(function (data, status) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        categoriesList = data.responseData;
                    }
                })
                .error(function (data, status) {
                    if (status === 0) {
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

        $scope.getPlaces = function (countryId, cityId, siteId) {
            if (!siteId) {
                showMessage.showError("Please select site to procced");
            }
            else {
                $http({
                    method: 'POST',
                    url: '/getPlaces',
                    data: {"countryId": countryId, "cityId": cityId, "siteId": siteId},
                    headers: {'Content-Type': 'application/json'}
                })
                    .success(function (data, status, headers, config) {
                        if (data.responseInfo.isErrorOccurred) {
                            showMessage.showError(data.responseInfo.responseMsg);
                        }
                        else {
                            $scope.places = data.responseData;
                            $scope.isTableFilled = true;
                            $scope.placesByCategories = $scope.prepareOutput(data.responseData, categoriesList);
                        }
                    })
                    .error(function (data, status) {
                        if (status === 0) {
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
            }
        };

        $scope.clearCurrSite = function () {
            $scope.isTableFilled = false;
            $scope.places = undefined;
        };

        $scope.resetForm = function () {
            $scope.isTableFilled = false;
            $scope.siteLocation.site = undefined;
            $scope.siteLocation.city = undefined;
            $scope.siteLocation.country = undefined;
            $scope.places = undefined;
        };

        $scope.openPlaceInfoModal = function (place) {
            $uibModal.open({
                animation: true,
                templateUrl: 'placeInformation.html',
                controller: 'PlaceInformationController',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    place: function () {
                        return place;
                    }
                }
            });
        };

        $scope.prepareOutput = function (places, categoriesList) {
            var res = [];
            var added = false;
            places.forEach(function (place) {
                for (var categ in place.categoryId) {
                    if (place.categoryId.hasOwnProperty(categ)) {
                        var isNew = false;
                        var dateDiff = Math.abs(new Date() - new Date(place.updated_at));
                        if (dateDiff < newPeriod) {
                            isNew = true;
                        }
                        place.isNew = isNew;
                        //Need to delete after full immigration to multiply images
                        if (place.imgSource && place.imgSource[0] && place.imgSource[0].source) {
                            place.mainPhoto = place.imgSource[0].source;
                        }
                        else {
                            place.mainPhoto = place.imgSource;
                        }
                        res.forEach(function (pRes) {
                            if (pRes.categoryId === place.categoryId[categ]) {
                                if (!pRes.isHasNew && place.isNew) {
                                    pRes.isHasNew = true;
                                }
                                pRes.placeInfo.push(place);
                                added = true;
                            }
                        });
                        if (!added) {
                            var tmp = {categoryId: '', categoryName: '', placeInfo: []};
                            categoriesList.forEach(function (catInfo) {
                                if (catInfo.categoryId === place.categoryId[categ]) {
                                    tmp.categoryId = catInfo.categoryId;
                                    tmp.categoryName = catInfo.categoryName;
                                    tmp.priority = catInfo.priority;
                                }
                            });
                            tmp.placeInfo[0] = place;
                            if (!tmp.isHasNew && place.isNew) {
                                tmp.isHasNew = true;
                            }
                            res.push(tmp);
                        }
                        added = false;
                    }
                }
            });

            res.sort(function (a, b) {
                return a.priority - b.priority;
            });

            res.forEach(function (category) {
                category.placeInfo.sort(function (a, b) {
                    if (b.placeRating && a.placeRating) {
                        if (b.placeRating === a.placeRating) {
                            return b.placeRating.numOfRatings - a.placeRating.numOfRatings;
                        }
                        return b.placeRating.avgRating - a.placeRating.avgRating;
                    }
                    else if (b.placeRating) {
                        return 1
                    }
                    else {
                        return -1;
                    }
                });
            });

            return res;
        };

        function addSitePhotoSrc(siteImageInfo) {
            $http({
                method: 'POST',
                url: '/updateSitePhotoSrc',
                data: {
                    "siteId": siteImageInfo.id,
                    "newSitePhotoSrc": '/resources/images/sitesFrontView/' + siteImageInfo.imageName
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        $route.reload();
                        showMessage.showMessage('The site photo was updated');
                    }
                })
                .error(function (data, status) {
                    if (status === 0) {
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
        }

        $scope.uploadFiles = function () {

            var imageInfo = {
                id: $scope.siteLocation.site.siteId,
                imageName: $scope.siteLocation.site.siteName + '_0.jpg',
                photoStruct: {
                    type: "LOCAL",
                    source: 'Client/resources/images/sitesFrontView/'
                }
            };

            Upload.rename($scope.sitePhoto, imageInfo.imageName);
            try {
                fileUpload.uploadFileToUrl($scope.sitePhoto, "/uploadImage", imageInfo, function (resp) {
                    if (resp.responseInfo.isErrorOccurred === true) {
                        var massage = "Was not able to upload the image";
                        showMessage.showError(massage);
                    }
                    else {
                        addSitePhotoSrc(imageInfo);
                    }
                });
            }
            catch (err) {
                responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: err};
                showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
            }
        };
    });
    return mainController;
});