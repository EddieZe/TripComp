/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, !(function webpackMissingModule() { var e = new Error("Cannot find module \"angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"domReady\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__(1), __webpack_require__(15), __webpack_require__(21), !(function webpackMissingModule() { var e = new Error("Cannot find module \"ngRoute\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"ui-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"ngSanitize\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"ngFileUpload\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"ngStorage\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, angular, document) {
	        var TripCompApp = angular.module('TripComp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngFileUpload', 'ctrlModule', 'direcModule', 'ngStorage']);
	        TripCompApp.config(function ($routeProvider) {
	            $routeProvider.
	                when('/', {
	                    templateUrl: '/main.html',
	                    controller: 'mainController'
	                }).
	                when('/addNewSite', {
	                    templateUrl: '/addNewSite.html',
	                    controller: 'AddSiteController'
	                }).
	                when('/addNewPlace', {
	                    templateUrl: '/addNewPlace.html',
	                    controller: 'AddPlaceController'
	                }).
	                when('/addNewCategory', {
	                    templateUrl: '/addNewCategory.html',
	                    controller: 'AddCategoryController'
	                }).
	                when('/about', {
	                    templateUrl: '/about.html',
	                    controller: 'AboutController'
	                }).
	                when('/contact', {
	                    templateUrl: '/contact.html',
	                    controller: 'ContactController'
	                }).
	                otherwise({redirectTo: '/'});
	        });
	        angular.bootstrap(document, ['TripComp']);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5),
	    __webpack_require__(10),
	    __webpack_require__(6),
	    __webpack_require__(7),
	    __webpack_require__(8),
	    __webpack_require__(9),
	    __webpack_require__(2),
	    __webpack_require__(11),
	    __webpack_require__(12),
	    __webpack_require__(13),
	    __webpack_require__(14)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(){}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
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
	                    source: 'Client/images/places/'
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()),__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(angular){
	    return angular.module('ctrlModule',['srvModule']);

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function(angular){
	    return angular.module('srvModule',[]);

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 19/10/2015.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(module){
	    var contactController = module.controller('ContactController', function ($scope, $http, $location, showMessage) {

	        $scope.name = "ContactController";

	        $scope.message = {};

	        $scope.sendMessage = function () {
	            var responseInfo;
	            console.log($scope.message);

	            $http({
	                method: 'POST',
	                url: '/sendEmail',
	                data: {
	                    "message": $scope.message
	                },
	                headers: {'Content-Type': 'application/json'}
	            })
	                .success(function (data, status, headers, config) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        showMessage.showError(data.responseInfo.responseMsg);
	                    }
	                    else {
	                        showMessage.showMessage('Thank you for contact us. We will handle your message and come back to you if needed');
	                        $location.path("/");
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
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        };

	    });

	    return contactController;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var addSiteController = module.controller('AddSiteController', function ($scope, $http, $location, fileUpload, Upload, $timeout, showMessage) {

	        $scope.newSiteInfo = {};

	        $scope.name = "AddSiteController";

	        $scope.clearFields = function () {

	            $scope.existingCountry = '';
	            $scope.existingCity = '';
	            $scope.newSiteInfo = undefined;
	            $scope.timeZone = '';
	            $scope.cityName = '';
	            $scope.countryName = '';
	        };

	        $scope.initPage = function () {

	            $scope.isNewCity = false;
	            $scope.isNewCountry = false;
	            $scope.sitePhoto = undefined;

	            $scope.clearFields();

	            if (!$scope.timeZones) {
	                getTimeZones();
	            }

	            if (!$scope.countries) {
	                getCountries();
	            }
	        };

	        $scope.updateCityList = function () {
	            if ($scope.existingCountry.countryId == '9999') {
	                $scope.isNewCountry = true;
	                $scope.isNewCity = true;
	            }
	            else {
	                $scope.isNewCountry = false;
	                $scope.isNewCity = false;
	            }
	            if (!($scope.existingCountry.countryId == '9999') && !($scope.existingCountry.cities.slice().pop().cityId == '999999')) {
	                $scope.existingCountry.cities.push({
	                    cityId: '999999',
	                    cityName: '=== Add New ==='
	                });
	                $scope.isAddNewCityAdded = true;
	            }
	        };

	        $scope.setVisability = function () {
	            $scope.isNewCity = $scope.existingCity.cityId == '999999';
	        };

	        $scope.addNewSite = function () {
	            var countryToAdd;
	            var cityToAdd;
	            var timeZone;
	            var stateToAdd;
	            var responseInfo;

	            if ($scope.existingCountry.countryId == '9999') {
	                countryToAdd = $scope.countryName;
	                cityToAdd = $scope.cityName;
	                timeZone = $scope.timeZone;
	                stateToAdd = $scope.state
	            }
	            else if (!($scope.existingCountry.countryId == '9999') && $scope.existingCity.cityId == '999999') {
	                countryToAdd = $scope.existingCountry.name;
	                cityToAdd = $scope.cityName;
	                timeZone = $scope.timeZone;
	                stateToAdd = $scope.state
	            }
	            else {
	                countryToAdd = $scope.existingCountry.name;
	                cityToAdd = $scope.existingCity.cityName;

	            }
	            if ($scope.sitePhoto) {
	                $scope.newSiteInfo.isImageSelected = true;
	            }
	            $scope.newSiteInfo.countryName = countryToAdd;
	            $scope.newSiteInfo.cityName = cityToAdd;
	            $scope.newSiteInfo.state = stateToAdd;
	            $scope.newSiteInfo.timeZone = timeZone;

	            $http({
	                method: 'POST',
	                url: '/addNewSite',
	                data: {
	                    "newSiteInfo": $scope.newSiteInfo
	                },
	                headers: {'Content-Type': 'application/json'}
	            })
	                .success(function (data, status, headers, config) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        showMessage.showError(data.responseInfo.responseMsg);
	                    }
	                    else if ($scope.newSiteInfo.isImageSelected && true === $scope.newSiteInfo.isImageSelected) {
	                        try {
	                            $scope.uploadFiles(data);
	                        }
	                        catch (err) {
	                            responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: err};
	                            showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                        }
	                        showMessage.showMessage('The site was added');
	                        $scope.initPage();
	                    }
	                    else {
	                        showMessage.showMessage('The site was added');
	                        $scope.initPage();
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
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        };

	        $scope.backupEverything = function () {

	            $http.get('/doBackup')
	                .success(function () {
	                })
	                .error(function (status) {
	                    if (status == 0) {
	                        responseInfo = {
	                            isErrorOccurred: true,
	                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                            errorData: status
	                        };
	                        showMessage.showError(responseInfo.responseMsg);
	                    }
	                    else {
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: err};
	                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        };

	        $scope.uploadFiles = function (data) {

	            var imageInfo = {
	                id: data.responseData.siteId,
	                imageName: data.responseData.siteId + '_' + data.responseData.siteName + '_0.jpg',
	                photoStruct: {
	                    type: "LOCAL",
	                    source: 'Client/images/sitesFrontView/'
	                }
	            };
	            fileUpload.uploadFileToUrl($scope.sitePhoto, "/uploadImage", imageInfo, function (resp) {
	                if (resp.responseInfo.isErrorOccurred === true) {
	                    var massage = "Was not able to upload the image";
	                    showMessage.showError(massage);
	                }
	            });
	        };

	        var getCountries = function () {
	            var responseInfo;
	            $http.get('/getCountries')
	                .success(function (data) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        showMessage.showError(data.responseInfo.responseMsg);

	                    }
	                    else {
	                        $scope.countries = data.responseData;
	                        $scope.countries.push({
	                            countryId: '9999',
	                            name: '=== Add New ==='
	                        });
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
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        };

	        var getTimeZones = function () {
	            var responseInfo;
	            $http.get('/getTimeZones')
	                .success(function (data) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        showMessage.showError(data.responseInfo.responseMsg);
	                    }
	                    else {
	                        $scope.timeZones = data.responseData;
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
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        }
	    });
	    return addSiteController;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var addPlaceController = module.controller('AddPlaceController', function ($scope, $http, $sce, $location, $anchorScroll, fileUpload, Upload, $timeout, showMessage, searchNearbyPlaces, checkAndGetPlaceInfoSrv) {

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
	            if ($scope.currTab != 'locationTab') {
	                $scope.goToTab('locationTab');
	            }
	            $('#addNewPlaceFrm').on('keyup keypress', function (e) {
	                var code = e.keyCode || e.which;
	                if (code == 13) {
	                    e.preventDefault();
	                    if ($scope.currTab == 'googleSearchTab' && $scope.searchStr) {
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
	                    if ($scope.siteLocation && $scope.siteLocation.site && $scope.newPlaceInfo.name && $scope.placeCategory.indexOf(true) != -1) {
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
	                                        source: 'Client/images/places/'
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
	                                console.log('Error occured while uploading place image.');
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

	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
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
	                            if (placeInfo.responseData.categories != undefined) {
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
	                    if (status == 0) {
	                        responseInfo = {
	                            isErrorOccurred: true,
	                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                            errorData: status
	                        };
	                        showMessage.showError(responseInfo.responseMsg);
	                    }
	                    else {
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(module) {
	    var addCategoryController = module.controller('AddCategoryController', function ($scope, $http, $location, showMessage) {

	        $scope.name = "AddCategoryController";

	        $scope.addNewCategory = function () {
	            var responseInfo;
	            $http({
	                method: 'POST',
	                url: '/addNewCategory',
	                data: {
	                    "categoryName": $scope.categoryName
	                },
	                headers: {'Content-Type': 'application/json'}
	            })
	                .success(function (data, status, headers, config) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        showMessage.showError(data.responseInfo.responseMsg);
	                    }
	                    else {
	                        showMessage.showMessage('The catagory was added');
	                        $location.path("/");
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
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        showMessage.showError(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        }
	    });

	    return addCategoryController;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(module) {
	    var aboutController = module.controller('AboutController', function ($scope, $http) {

	    });

	    return aboutController;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var mainController = module.controller('mainController', function ($scope, $uibModal, $route, $http, $sce, showMessage, fileUpload, Upload) {

	        var googleAPIToken = 'AIzaSyDv5ktX4y4beBVP_BCP0AKuqoFgg-RH0DQ';
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
	                    "newSitePhotoSrc": '/images/sitesFrontView/' + siteImageInfo.imageName
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
	                    source: 'Client/images/sitesFrontView/'
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  02/11/2015
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var locationController = module.controller('locationController', function ($scope, getSites, $sessionStorage) {

	        $scope.siteLoc = {};
	        init();

	        function init(){
	            getCountries();
	            setWatches();
	        }

	        function setWatches(){
	            $scope.$watch('siteLoc.country', function (newCountry) {
	                if (!newCountry) {
	                    $("#countrySelection").addClass("empty");
	                }
	                else {
	                    $("#countrySelection").removeClass("empty");
	                }
	                if (newCountry && newCountry.cities && newCountry.cities.length == 1) {
	                    $scope.siteLoc.city = newCountry.cities[0];
	                }
	            });
	            $scope.$watch('siteLoc.city', function (newCity) {
	                if (!newCity) {
	                    $("#citySelection").addClass("empty");
	                }
	                else {
	                    $("#citySelection").removeClass("empty");
	                }
	                if (newCity && newCity.sites && newCity.sites.length == 1) {
	                    $scope.siteLoc.site = newCity.sites[0];
	                }
	            });
	            $scope.$watch('siteLoc.site', function (newSite) {
	                if (!newSite) {
	                    $("#siteSelection").addClass("empty");
	                }
	                else {
	                    $sessionStorage.country = $scope.siteLoc.country;
	                    $sessionStorage.city = $scope.siteLoc.city;
	                    $sessionStorage.site = $scope.siteLoc.site;
	                    $("#siteSelection").removeClass("empty");
	                }
	            });
	        }

	        function getCountries(){
	            if ($sessionStorage.countries) {
	                $scope.countries = $sessionStorage.countries;
	                selectFromStorage()
	            }
	            else {
	                getSites.getSites(function (response) {
	                    if (!response.responseInfo.isErrorOccurred) {
	                        $scope.countries = response.responseData;
	                        $sessionStorage.countries = response.responseData;
	                        selectFromStorage();
	                    }
	                });
	            }
	        }

	        function selectFromStorage(){
	            if ($sessionStorage.country && $sessionStorage.city && $sessionStorage.site) {
	                $scope.countries.forEach(function (country, index) {
	                    if (country.name == $sessionStorage.country.name) {
	                        $scope.siteLoc.country = $scope.countries[index];
	                        $scope.siteLoc.city = $sessionStorage.city;
	                        $scope.siteLoc.site = $sessionStorage.site;
	                    }
	                });
	            }
	        }
	    });
	    return locationController
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  26/01/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {

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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  08/05/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  11/05/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  20/10/2015
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(16),
	    __webpack_require__(18),
	    __webpack_require__(19),
	    __webpack_require__(20)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(){}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function(module) {
	    var fileModel = module.directive('fileModel', ['$parse', function ($parse) {
	        return {
	            restrict: 'A',
	            link: function (scope, element, attrs) {
	                var model = $parse(attrs.fileModel);
	                var modelSetter = model.assign;

	                element.bind('change', function () {
	                    scope.$apply(function () {
	                        modelSetter(scope, element[0].files[0]);
	                    });
	                });
	            }
	        };
	    }])
	    return fileModel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function(angular){
	    return angular.module('direcModule',[]);

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  02/11/2015
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var selectLocation = module.directive('selectLocation', function () {
	        return {
	            restrict: 'AEC',
	            controller: 'locationController',
	            scope: {
	                siteLoc: '=loc'
	            },
	            templateUrl: '../../templates/locationTab.html'
	        }
	    });
	    return selectLocation;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  26/01/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  08/05/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(22),
	    __webpack_require__(23),
	    __webpack_require__(24),
	    __webpack_require__(25),
	    __webpack_require__(26),
	    __webpack_require__(27),
	    __webpack_require__(28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(){}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var fileUpload = module.service('fileUpload', ['Upload', function (Upload) {
	        this.uploadFileToUrl = function (file, uploadUrl, imageInfo, callback) {
	            Upload.rename(file, imageInfo.imageName);
	            Upload.upload({
	                url: uploadUrl,
	                file: file,
	                data: {
	                    "id": imageInfo.id,
	                    "newPhotoSrc": imageInfo.photoStruct
	                }
	            }).then(function (resp) {
	                if (resp.data.responseInfo.isErrorOccurred === true) {
	                    console.log('Error status: ' + resp.status + ', Error Msg: '+ resp.data.responseInfo.responseMsg);
	                    callback(resp.data)
	                }
	                else {
	                    console.log('Success ' + resp.config.data.file.name + ' uploaded.');
	                    callback(resp.data);
	                }
	            });
	        }
	    }]);
	    return fileUpload;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by EDDIEZ on 20/10/2015.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), !(function webpackMissingModule() { var e = new Error("Cannot find module \"bootstrap-dialog\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function (module, BootstrapDialog) {
	    var showMessage = module.service('showMessage', function () {
	        return {
	            showError: function (errMsg) {
	                BootstrapDialog.show({
	                    title: 'Error',
	                    type: BootstrapDialog.TYPE_WARNING,
	                    message: $('<div>' + errMsg + '</div>').html(),
	                    draggable: true,
	                    buttons: [{
	                        id: 'btn-ok',
	                        icon: 'glyphicon glyphicon-check',
	                        label: 'OK',
	                        cssClass: 'btn-primary',
	                        action: function (dialogRef) {
	                            dialogRef.close();
	                        }
	                    }]
	                });
	            },
	            showMessage: function (msg) {
	                BootstrapDialog.show({
	                    title: 'Success',
	                    type: BootstrapDialog.TYPE_SUCCESS,
	                    message: $('<div>' + msg + '</div>').html(),
	                    draggable: true,
	                    buttons: [{
	                        id: 'btn-ok',
	                        icon: 'glyphicon glyphicon-check',
	                        label: 'OK',
	                        cssClass: 'btn-primary',
	                        action: function (dialogRef) {
	                            dialogRef.close();
	                        }
	                    }]
	                });
	            }
	        }
	    });
	    return showMessage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TipMe==========
	 * Author: Eddie Zeltser
	 * Create Date:  03/11/2015
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var getSites = module.service('getSites', ['$http', function ($http) {
	        this.getSites = function (callback) {
	            var responseInfo = {};
	            $http.get('/getCountries')
	                .success(function (data, status) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        console.log(data.responseInfo.responseMsg);
	                    }
	                    else {
	                        callback(data);
	                    }
	                })
	                .error(function (data, status) {
	                    if (status === 0 || status === 404) {
	                        responseInfo = {
	                            isErrorOccurred: true,
	                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                            errorData: status
	                        };
	                        console.log(responseInfo.responseMsg);
	                    }
	                    else {
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        console.log(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        }
	    }]);
	    return getSites;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  24/11/2015
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var searchNearbyPlaces = module.service('searchNearbyPlaces', ['$http', function ($http) {
	        this.searchNearbyPlaces = function (input, callback) {
	            var responseInfo = {};
	            $http({
	                timeout: 60000,
	                method: 'POST',
	                url: '/google/searchNearByPlaces',
	                data: {
	                    location: input.location.lat + "," + input.location.lng,
	                    radius: input.radius,
	                    keyword: input.keyWord
	                },
	                headers: {'Content-Type': 'application/json'}
	            })
	                .success(function (data, status, headers, config) {
	                    if (data && data.responseInfo && data.responseInfo.isErrorOccurred) {
	                        console.log(data.responseInfo.responseMsg);
	                        callback({responseInfo : {
	                            isErrorOccurred: true,
	                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                            errorData: status
	                        }});
	                    }
	                    else {
	                        callback(data);
	                    }
	                })
	                .error(function (data, status) {
	                    if (status === 0 || status === 404) {
	                        callback({responseInfo : {
	                            isErrorOccurred: true,
	                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                            errorData: status
	                        }});
	                    }
	                    else {
	                        callback({responseInfo : {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data}});
	                    }
	                });
	        };
	    }]);
	    return searchNearbyPlaces;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  30/11/2015
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var checkAndGetPlaceInfoSrv = module.service('checkAndGetPlaceInfoSrv', ['$http', function ($http) {
	        this.checkAndGetPlaceInfo = function (input, callback) {
	            var responseInfo = {};
	            $http({
	                timeout: 60000,
	                method: 'POST',
	                url: '/google/checkAndGetPlaceInfo',
	                data: input,
	                headers: {'Content-Type': 'application/json'}
	            })
	                .success(function (data, status, headers, config) {
	                    if (data && data.responseInfo && data.responseInfo.isErrorOccurred) {
	                        callback(data);
	                    }
	                    else {
	                        callback(data);
	                    }
	                })
	                .error(function (data, status) {
	                    if (status === 0 || status === 404) {
	                        callback({
	                            responseInfo: {
	                                isErrorOccurred: true,
	                                responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                                errorData: status
	                            }
	                        });
	                    }
	                    else {
	                        callback({responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data}});
	                    }
	                });
	        };

	    }]);
	    return checkAndGetPlaceInfoSrv;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  11/05/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var updatePlaceLinks = module.service('updatePlaceLinks', ['$http', function ($http) {
	        this.updatePlaceLinks = function (input, callback) {
	            var responseInfo = {};
	            if (input.links.length === 0) {
	                responseInfo = {
	                    isErrorOccurred: true,
	                    responseMsg: "Nothing to update for customer: " + input.placeId,
	                    errorData: status
	                };
	                console.log(responseInfo.responseMsg);
	                callback(responseInfo);
	            }
	            else {
	                $http({
	                    timeout: 60000,
	                    method: 'POST',
	                    url: '/updatePlaceLinks',
	                    data: input,
	                    headers: {'Content-Type': 'application/json'}
	                }).success(function (data, status) {
	                        if (data.responseInfo.isErrorOccurred) {
	                            console.log(data.responseInfo.responseMsg);
	                        }
	                        else {
	                            callback(data);
	                        }
	                    })
	                    .error(function (data, status) {
	                        if (status === 0 || status === 404 || status === -1) {
	                            responseInfo = {
	                                isErrorOccurred: true,
	                                responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                                errorData: status
	                            };
	                            console.log(responseInfo.responseMsg);
	                            callback(responseInfo);
	                        }
	                        else {
	                            responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                            console.log(responseInfo.responseMsg + responseInfo.errorData);
	                            callback(responseInfo);
	                        }
	                    });
	            }
	        }
	    }]);
	    return updatePlaceLinks;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 ========TripComp========
	 * Author: Eddie Zeltser
	 * Create Date:  11/05/2016
	 */
	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    var getLinksTypes = module.service('getLinksTypes', ['$http', function ($http) {
	        this.getLinksTypes = function (callback) {
	            var responseInfo = {};
	            $http.get('/getLinksTypes')
	                .success(function (data, status) {
	                    if (data.responseInfo.isErrorOccurred) {
	                        console.log(data.responseInfo.responseMsg);
	                    }
	                    else {
	                        callback(data);
	                    }
	                })
	                .error(function (data, status) {
	                    if (status === 0 || status === 404) {
	                        responseInfo = {
	                            isErrorOccurred: true,
	                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
	                            errorData: status
	                        };
	                        console.log(responseInfo.responseMsg);
	                    }
	                    else {
	                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: data};
	                        console.log(responseInfo.responseMsg + responseInfo.errorData);
	                    }
	                });
	        };
	    }]);
	    return getLinksTypes;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);