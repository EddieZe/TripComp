/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./ctrlModule'], function (module) {
    var addPlaceController = module.controller('AddPlaceController', function ($scope, $http, $sce, $location, $anchorScroll, fileUpload, Upload, $timeout, $sessionStorage, showMessage, searchNearbyPlaces, checkAndGetPlaceInfoSrv) {

        var googleAPIToken = 'AIzaSyC5OiqUQQYgdW7UtyRugpEKHWQN5GknOQE';
        var placeCategories = {
            GENERAL: 0,
            HIKING: 1,
            RESTAURANT: 2,
            HOTEL: 3,
            SKI: 4,
            CAR_RENTAL: 5,
            SHOPPING: 6,
            CAFE: 7,
            MUSEUM: 8,
            BAR: 9,
            PARK: 10,
            HISTORY: 11,
            NIGHTCLUB: 12,
            GYM: 13,
            DIVING: 14,
            ENTERTAINMENT: 15

        };

        $scope.newPlaceInfo = {};
        $scope.nextPage = 'googleSearchTab';
        $scope.prevPage = undefined;
        $scope.currTab = 'locationTab';
        $scope.searchResults = undefined;
        $scope.isResultsEmpty = false;
        $scope.isSearching = false;
        $scope.isPlaceFromGoogle = false;
        $scope.isPlaceSelected = false;
        $scope.searchRadius = undefined;
        $scope.radiuses = [
            {text: '1Km', value: 1000},
            {text: '3Km', value: 3000},
            {text: '5Km', value: 5000},
            {text: '10Km', value: 10000},
            {text: '25Km', value: 25000},
            {text: '50Km', value: 50000}
        ];
        $scope.placeCategory = [];
        $scope.choosenPlaceCord = {};
        $scope.placeLevels = [
            {placeId: 1, text: "Country"},
            {placeId: 2, text: "State"},
            {placeId: 3, text: "City"},
            {placeId: 4, text: "Site"}
        ];

        $scope.initPage = function () {
            clearForm();
            if ($sessionStorage.country && $sessionStorage.city && $sessionStorage.site) {
                $scope.siteLocation = {
                    country: $sessionStorage.country,
                    city: $sessionStorage.city,
                    site: $sessionStorage.site
                };
                $scope.goToTab('googleSearchTab');
            }
            else {
                $scope.goToTab('locationTab');
            }
            $('#addNewPlaceFrm').on('keyup keypress', function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    if ($scope.currTab === 'googleSearchTab' && $scope.searchStr) {
                        $scope.searchForPlaces($scope.siteLocation.site, $scope.searchStr, $scope.searchRadius.value);
                    }
                    else {
                        return false;
                    }
                }
            });

            $scope.$watch('siteLocation.site', function () {
                $scope.searchResults = [];
                $scope.isResultsEmpty = false;
                $scope.isSearching = false;
                $scope.isPlaceFromGoogle = false;
                $scope.isPlaceSelected = false;
                $scope.searchStr = "";
                $scope.newPlaceInfo = {};
                $scope.placeCategory = [];
            });

            if (!$scope.placeCategories) {
                callGetCategories();
            }
        };

        $scope.goToTab = function (tabName) {
            var headSelec = $('li[id$="Head"]');
            switch (tabName) {
                case 'locationTab':
                    headSelec.removeClass('active-head');
                    $('#locationTabHead').addClass('active-head');
                    $scope.nextPage = 'googleSearchTab';
                    $scope.prevPage = undefined;
                    $scope.currTab = 'locationTab';
                    break;
                case 'googleSearchTab':
                    if ($scope.siteLocation && $scope.siteLocation.site) {
                        headSelec.removeClass('active-head');
                        $('#googleSearchTabHead').addClass('active-head');
                        $scope.nextPage = 'generalInfoTab';
                        $scope.prevPage = 'locationTab';
                        $scope.currTab = 'googleSearchTab';
                    }
                    break;
                case 'generalInfoTab':
                    if ($scope.siteLocation && $scope.siteLocation.site && ($scope.isResultsEmpty || $scope.isPlaceFromGoogle)) {
                        headSelec.removeClass('active-head');
                        $('#generalInfoTabHead').addClass('active-head');
                        $scope.nextPage = 'imageUploadTab';
                        $scope.prevPage = 'googleSearchTab';
                        $scope.currTab = 'generalInfoTab';
                    }
                    break;
                case 'imageUploadTab':
                    if ($scope.siteLocation && $scope.siteLocation.site && $scope.newPlaceInfo.name && $scope.placeCategory.indexOf(true) !== -1) {
                        headSelec.removeClass('active-head');
                        $('#imageUploadTabHead').addClass('active-head');
                        $scope.nextPage = undefined;
                        $scope.prevPage = 'generalInfoTab';
                        $scope.currTab = 'imageUploadTab';
                    }
                    break;
            }

        };

        var clearForm = function () {
            $scope.links = [{}];
            $scope.placePhoto = undefined;
            $scope.newPlaceInfo = undefined;
        };

        $scope.addNewPlace = function (countryId, cityId, siteId) {

            var chossenCategories = [];

            $.each($scope.placeCategory, function (index, el) {
                if (el) {
                    (chossenCategories.push(index))
                }
            });

            populateLinks();

            placeLevelId = 3;
            var location = {
                countryId: countryId,
                cityId: cityId,
                siteId: siteId
            };
            $scope.newPlaceInfo.location = location;
            $scope.newPlaceInfo.placeLevel = placeLevelId;
            $scope.newPlaceInfo.categoryId = chossenCategories;
            if ($scope.placePhoto) {
                $scope.newPlaceInfo.isImageSelected = true;
            }


            $http({
                method: 'POST',
                url: '/addNewPlace',
                data: {
                    "newPlaceInfo": $scope.newPlaceInfo
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        var massage = "The place was added";
                        if ($scope.newPlaceInfo.isImageSelected) {
                            try {
                                var imageInfo = {
                                    id: data.responseData.placeId,
                                    photoStruct: {
                                        type: "LOCAL",
                                        source: 'Client/resources/images/places/'
                                    },
                                    imageName: data.responseData.placeId + '_0.jpg'
                                };
                                fileUpload.uploadFileToUrl($scope.placePhoto, "/uploadImage", imageInfo, function (resp) {
                                    if (resp.responseInfo.isErrorOccurred === true) {
                                        massage = 'The place was added, but there was a problem uploading the image';
                                        showMessage.showMessage(massage);
                                    }
                                    else {
                                        showMessage.showMessage(massage);
                                    }
                                });
                            }
                            catch (err) {
                                console.log('Error occurred while uploading place image.');
                                massage = 'The place was added, but there was a problem uploading the image';
                                showMessage.showMessage(massage);
                            }
                        }
                        else {
                            showMessage.showMessage(massage);
                        }
                        $scope.initPage();
                    }
                })
                .error(function (data, status) {
                    if (status === 0 || status === 500) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        showMessage.showError(responseInfo.responseMsg);
                    }
                    else {

                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data};
                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
                    }
                });
        };

        var populateLinks = function () {
            $scope.newPlaceInfo.links = [];
            $scope.links.forEach(function (link) {
                if (link.url) {
                    var newLink = {};
                    newLink.URL = link.url;
                    newLink.type = link.type.type;
                    newLink.name = link.type.name;
                    $scope.newPlaceInfo.links.push(newLink);
                }
            });
        };

        $scope.searchForPlaces = function (site, searchStr, radius) {

            //create input obj
            var restInput = {
                location: site.googleInfo,
                radius: radius,
                keyWord: searchStr
            };

            $scope.isResultsEmpty = false;
            $scope.isSearching = true;
            $scope.isPlaceSelected = false;
            $scope.searchResults = [];

            searchNearbyPlaces.searchNearbyPlaces(restInput, function (output) {
                if (output.responseInfo && output.responseInfo.isErrorOccurred) {
                    $scope.errorMsg = output.responseInfo.responseMsg;
                    $scope.isResultsEmpty = true;
                    $scope.isSearching = false;
                }
                else if (!output.responseData || output.responseData.length === 0) {
                    $scope.isResultsEmpty = true;
                    $scope.isSearching = false;
                }
                else {
                    $scope.searchResults = output.responseData;
                    $scope.isSearching = false;
                }
            });
        };

        $scope.populatePlaceInfo = function (place) {
            if (place) {
                clearForm();
                var restInput = {
                    location: {
                        countryId: $scope.siteLocation.country.countryId,
                        cityId: $scope.siteLocation.city.cityId
                    },
                    placeId: place.placeId
                };
                checkAndGetPlaceInfoSrv.checkAndGetPlaceInfo(restInput, function (placeInfo) {
                    if (placeInfo) {
                        if (placeInfo.responseInfo && placeInfo.responseInfo.isErrorOccurred && placeInfo.responseData) {
                            var location = placeInfo.responseData;
                            showMessage.showError("This place was already added in the location:\n <b>Country:</b> " + location.countryName + ", <b>City:</b> " + location.cityName + ", <b>Site:</b> " + location.siteName);
                        }
                        else if (placeInfo.responseInfo && placeInfo.responseInfo.isErrorOccurred) {
                            showMessage.showError(placeInfo.responseInfo.responseMsg);
                        }
                        else if (placeInfo.responseData) {
                            $scope.placeCategory = [];
                            $scope.isPlaceFromGoogle = true;
                            $scope.newPlaceInfo = {
                                name: placeInfo.responseData.name,
                                address: placeInfo.responseData.address,
                                phoneNumber: placeInfo.responseData.phoneNumber,
                                googleInfo: {
                                    googlePlaceId: placeInfo.responseData.placeId,
                                    locationInfo: {
                                        lat: placeInfo.responseData.location.lat,
                                        lng: placeInfo.responseData.location.lng
                                    }
                                }
                            };
                            if (placeInfo.responseData.website) {
                                $scope.links[0] = {
                                    url: placeInfo.responseData.website,
                                    type: {
                                        typeId: 0,
                                        type: "siteURL",
                                        name: "Web Site"
                                    }
                                }
                            }
                            if (placeInfo.responseData.categories !== undefined) {
                                placeInfo.responseData.categories.forEach(placeCategMapper);
                            }
                            $scope.goToTab($scope.nextPage);

                        }
                    }
                });
            }
        };

        var placeCategMapper = function (categFromGoogle) {
            switch (categFromGoogle) {
                case "lodging":
                    $scope.placeCategory[placeCategories.HOTEL] = true;
                    break;
                case "bar":
                    $scope.placeCategory[placeCategories.BAR] = true;
                    break;
                case "cafe":
                    $scope.placeCategory[placeCategories.CAFE] = true;
                    break;
                case "car_rental":
                    $scope.placeCategory[placeCategories.CAR_RENTAL] = true;
                    break;
                case "gym":
                    $scope.placeCategory[placeCategories.GYM] = true;
                    break;
                case "museum":
                    $scope.placeCategory[placeCategories.MUSEUM] = true;
                    break;
                case "night_club":
                    $scope.placeCategory[placeCategories.NIGHTCLUB] = true;
                    break;
                case "park":
                    $scope.placeCategory[placeCategories.PARK] = true;
                    break;
                case "rv_park":
                    $scope.placeCategory[placeCategories.PARK] = true;
                    break;
                case "campground":
                    $scope.placeCategory[placeCategories.PARK] = true;
                    break;
                case "amusement_park":
                    $scope.placeCategory[placeCategories.PARK] = true;
                    break;
                case "restaurant":
                    $scope.placeCategory[placeCategories.RESTAURANT] = true;
                    break;
                case /^store/.test(categFromGoogle):
                    $scope.placeCategory[placeCategories.SHOPPING] = true;
                    break;
                case "shopping_mall":
                    $scope.placeCategory[placeCategories.SHOPPING] = true;
                    break;
                case "pharmacy":
                    $scope.placeCategory[placeCategories.SHOPPING] = true;
                    break;
                case "grocery_or_supermarket":
                    $scope.placeCategory[placeCategories.GENERAL] = true;
                    break;
                case "laundry":
                    $scope.placeCategory[placeCategories.GENERAL] = true;
                    break;
                case "movie_theater":
                    $scope.placeCategory[placeCategories.ENTERTAINMENT] = true;
                    break;
            }
        };

        var callGetCategories = function () {
            var responseInfo;
            $http.get('/getCategories')
                .success(function (data, status) {
                    if (data.responseInfo.isErrorOccurred) {
                        showMessage.showError(data.responseInfo.responseMsg);
                    }
                    else {
                        $scope.placeCategories = data.responseData;
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
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: data};
                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
                    }
                });
        };

        $scope.onPlaceSelect = function (place) {

            $scope.choosenPlace = place;
            $scope.choosenPlaceCord = {
                googlePlaceId: place.placeId
            };
            $scope.isPlaceSelected = true;
            $("[id^='placeThumbnail_']").removeClass("selected_place");
            $("#placeThumbnail_" + place.placeId).addClass("selected_place");
        };

        $scope.getIframeSrc = function (place) {
            if (place) {
                if (place.googlePlaceId) {
                    return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=place_id:' + place.googlePlaceId);
                }
                else if ($scope.isLocationExist) {
                    return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=' + place.locationInfo.lat + ',' + place.locationInfo.lng);
                }
            }
        };
    });

    return addPlaceController;
});