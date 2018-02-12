/**
 * Created by EDDIEZ on 20/10/2015.
 */

var require = {
    baseUrl: "/",
    // alias libraries paths
    paths: {
        'jquery':'../lib/jquery/jquery.min',
        'domReady': '../lib/requirejs-domready/domReady.min',
        'angular': '../lib/angular/1.4.9/angular.min',
        'ngRoute': '../lib/angular/1.4.9/angular-route.min',
        'bootstrap': '../lib/bootstrap/3.3.6/bootstrap.min',
        'angular-animate':'../lib/angular-animate/1.4.9/angular-animate.min',
        'ngStorage':'../lib/ngstorage/ngStorage.min',
        'ui-bootstrap':'../lib/bootstrap/ui-bootstrap-tpls-1.1.1.min',
        'ngSanitize': '../lib/angular/1.4.9/angular-sanitize.min',
        'ngFileUpload': '../lib/angular-file/ng-file-upload.min',
        'ngFileUploadShim': '../lib/angular-file/ng-file-upload-shim.min',
        'bootstrap-dialog':'../lib/bootstrap/3.3.6/bootstrap-dialog'
    },
    waitSeconds: 0,
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular',
            deps:['jquery']
        },
        ngRoute: ['angular'],
        ngSanitize: ['angular'],
        ngFileUpload:['angular'],
        ngFileUploadShim:['ngFileUpload'],
        'bootstrap': ['jquery','angular'],
        'angular-animate':['angular'],
        'ngStorage':['angular'],
        'ui-bootstrap': ['bootstrap'],
        'bootstrap-dialog':['bootstrap']
    }
};