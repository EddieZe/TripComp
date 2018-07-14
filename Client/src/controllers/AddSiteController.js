/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['./ctrlModule'], function (module) {
    var addSiteController = module.controller('AddSiteController', function ($scope, $http, $sce, $location, fileUpload, Upload, $timeout, showMessage, searchAddresses, retriveTimeZoneForLocationSrv) {

        var googleAPIToken = 'AIzaSyC5OiqUQQYgdW7UtyRugpEKHWQN5GknOQE';
        $scope.newSiteInfo = {};
        $scope.name = "AddSiteController";

        $scope.clearFields = function () {

            $scope.existingCountry = '';
            $scope.existingCity = '';
            $scope.newSiteInfo = {};
            $scope.timeZone = '';
            $scope.cityName = '';
            $scope.countryName = '';
        };

        $scope.initPage = function () {

            $scope.isNewCity = false;
            $scope.isNewCountry = false;
            $scope.sitePhoto = undefined;
            $scope.isAddressValidated = false;
            $scope.clearFields();
            $scope.goToTab('addressTab');
        };

        $scope.goToTab = function (tabName) {
            var headSelec = $('li[id$="Head"]');
            switch (tabName) {
                case 'addressTab':
                    headSelec.removeClass('active-head');
                    $('#locationTabHead').addClass('active-head');
                    $scope.nextPage = 'generalInfoTab';
                    $scope.prevPage = undefined;
                    $scope.currTab = 'addressTab';
                    break;
                case 'generalInfoTab':
                    if ($scope.isAddressValidated) {
                        headSelec.removeClass('active-head');
                        $('#generalInfoTabHead').addClass('active-head');
                        $scope.nextPage = 'imageUploadTab';
                        $scope.prevPage = 'addressTab';
                        $scope.currTab = 'generalInfoTab';
                    }
                    break;
                case 'imageUploadTab':
                    if ($scope.isAddressValidated && !$scope.addSiteForm.$invalid) {
                        headSelec.removeClass('active-head');
                        $('#imageUploadTabHead').addClass('active-head');
                        $scope.nextPage = undefined;
                        $scope.prevPage = 'generalInfoTab';
                        $scope.currTab = 'imageUploadTab';
                    }
                    break;
            }

        };

        $scope.updateCityList = function () {
            if ($scope.existingCountry.countryId === '9999') {
                $scope.isNewCountry = true;
                $scope.isNewCity = true;
            }
            else {
                $scope.isNewCountry = false;
                $scope.isNewCity = false;
            }
            if (!($scope.existingCountry.countryId === '9999') && !($scope.existingCountry.cities.slice().pop().cityId === '999999')) {
                $scope.existingCountry.cities.push({
                    cityId: '999999',
                    cityName: '=== Add New ==='
                });
                $scope.isAddNewCityAdded = true;
            }
        };

        $scope.setVisability = function () {
            $scope.isNewCity = $scope.existingCity.cityId === '999999';
        };

        $scope.addNewSite = function () {
            var responseInfo;

            if ($scope.sitePhoto) {
                $scope.newSiteInfo.isImageSelected = true;
            }

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
                            responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: err};
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

        $scope.backupEverything = function () {

            $http.get('/doBackup')
                .success(function () {
                })
                .error(function (status) {
                    if (status === 0) {
                        responseInfo = {
                            isErrorOccurred: true,
                            responseMsg: 'Can\'t reach the server, please contact the Administrator',
                            errorData: status
                        };
                        showMessage.showError(responseInfo.responseMsg);
                    }
                    else {
                        responseInfo = {isErrorOccurred: true, responseMsg: 'Error occurred', errorData: err};
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
                    source: 'Client/resources/images/sitesFrontView/'
                }
            };
            fileUpload.uploadFileToUrl($scope.sitePhoto, "/uploadImage", imageInfo, function (resp) {
                if (resp.responseInfo.isErrorOccurred === true) {
                    var massage = "Was not able to upload the image";
                    showMessage.showError(massage);
                }
            });
        };

        $scope.clearAddressDetails = function () {
            $scope.newSiteInfo.googleInfo = undefined;
            $scope.newSiteInfo.siteAddress = undefined;
            $scope.isAddressValidated = false;
        };

        $scope.verifyAddress = function () {
            if ($scope.searchAddress) {
                searchAddresses.searchAddresses($scope.searchAddress, function (searchAddressOutput) {
                    if (searchAddressOutput.responseInfo.isErrorOccurred){
                        showMessage.showError("Server is not reachable, Please try again later.")
                    }
                    else if (searchAddressOutput.responseData.length === 0) {
                        showMessage.showMessage("No valid addresses were found");
                        $scope.isAddressValidated = false;
                    }
                    else {
                        var address = searchAddressOutput.responseData[0];
                        retriveTimeZoneForLocationSrv.retriveTimeZone(address.location.lat + "," + address.location.lng, function (retriveTimeZoneOutput) {
                            if (retriveTimeZoneOutput.responseData) {
                                $scope.newSiteInfo.timeZone = retriveTimeZoneOutput.responseData.formatedTimeZone;
                            }
                            $scope.newSiteInfo.googleInfo = address.location;
                            $scope.newSiteInfo.siteAddress = address.formattedAddress;
                            $scope.newSiteInfo.countryName = address.country;
                            $scope.newSiteInfo.cityName = address.city;
                            $scope.newSiteInfo.state = address.state;
                            $scope.isAddressValidated = true;
                            $scope.goToTab('generalInfoTab');
                        });
                    }
                });
            }
        };

        $scope.getIframeSrc = function (siteCords) {
            if (siteCords && $scope.isAddressValidated) {
                if (siteCords.placeId) {
                    return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=place_id:' + siteCords.placeId);
                }
                else if (siteCords.googleInfo) {
                    return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + googleAPIToken + '&q=' + siteCords.googleInfo.lat + ',' + siteCords.googleInfo.lng);
                }
            }
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
    });
    return addSiteController;
});