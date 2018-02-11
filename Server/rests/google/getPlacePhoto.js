/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/11/2015
 */
'use strict';

var express = require('express');
var appConsts = require('../../infra/appConstsAndProperties');
var googleExecuter = require('./googleRestExecuter');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');

router.post('/', function (req, res) {

    //Prepare Input for getNearByPlaces
    var parameters = {
        maxwidth: req.body.maxWidth,
        photoreference: req.body.photoRef
    };

/*    var options = {
        host: appConsts.PROXY_HOST,
        port: appConsts.PROXY_PORT,
        path: appConsts.GOOGLE_APIS.GET_PLACE_PHOTO + "?" + querystring.stringify(parameters),
        headers: {
            Host: appConsts.GOOGLE_HOST
        }
    };*/
    var options = {
        host: appConsts.PROXY_HOST,
        port: appConsts.PROXY_PORT,
        url: 'http://www.google.com/images/srpr/logo3w.png',
        headers: {
            Host: appConsts.GOOGLE_HOST
        }
    };

    var fs = require('fs'),
        request = require('request');

    var proxyUrl = 'https://' + appConsts.PROXY_HOST + ':' + appConsts.PROXY_PORT;
    var proxiedRequest = request.defaults({'proxy': proxyUrl});

    var download = function (uri, filename, callback) {
        proxiedRequest.get(uri, function (err, res, body) {

            if (err) {
                console.log(JSON.stringify(err));
                callback();
            }
            else {
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
                    .on('error', function(err){
                       console.log('Error: ' + err);
                    });
            }
        });
    };

    download('http://www.google.com/images/srpr/logo3w.png', 'google.png', function () {
        console.log('done');
    });

    /*    googleExecuter(appConsts.GOOGLE_APIS.GET_PLACE_PHOTO, parameters, function (photo) {
     console.log(photo);*/

    /*
     https.request(options, function (err, googleRes) {
     if (err) {
     console.log(err);
     }
     else {
     console.log(googleRes)
     }
     }).on('error', function (err) {
     logger.error('googleRestExecuter.executeCall', err);
     callback({responseInfo: {isErrorOccurred: true, responseMsg: err}});
     }).end();
     */


    /*if (places.responseInfo.isErrorOccurred) {
     res.send(photo)
     }
     else {
     var input = prepareInputForGetPlacesInfo(places.responseData.results);
     callGetPlacesInfo(input, function (output) {
     res.send({
     responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
     responseData: output
     });
     });
     }*/
    /*    });*/

});

module.exports = router;