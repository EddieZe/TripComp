/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  02/11/2015
 */
'use strict';

define(['./ctrlModule'], function (module) {
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
});