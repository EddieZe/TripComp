/**
 ========TipMe==========
 * Author: Eddie Zeltser
 * Create Date:  13/11/2015
 */
'use strict';

var express = require('express');
var appConsts = require('../../infra/appConstsAndProperties');
var googleExecuter = require('./googleRestExecuter');
var router = express.Router();


router.post('/', function (req, res) {

    var parameters = {
        location: req.body.location,
        radius: req.body.radius,
        keyword: req.body.keyword
    };

    googleExecuter(appConsts.GOOGLE_APIS.GET_NEARBY_PLACES_SUMMERY, parameters, function (response) {
        if (response.responseInfo.isErrorOccurred) {
            res.send(response)
        }
        else {
            res.send({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: prepareOutput(response.responseData.results)
            });
        }
    });

    var prepareOutput = function (googleOutput) {
        var res = [];
        for (var i in googleOutput) {
            res[i] = {
                name: googleOutput[i].name,
                placeId: googleOutput[i].place_id,
                address: googleOutput[i].vicinity,
                icon: googleOutput[i].icon
            };
        }
        return res;
    }
});

module.exports = router;