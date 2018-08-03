/**
 * Created by EDDIEZ on 20/10/2015.
 */
define(['require', 'angular', 'domReady', './controllers/index', './directives/index', './services/index', 'ngRoute', 'ui-bootstrap', 'ngSanitize', 'ngFileUpload', 'ngStorage'],
    function (require, angular, document) {
        const TripCompApp = angular.module('TripComp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngFileUpload', 'ctrlModule', 'direcModule', 'ngStorage']);
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
    });