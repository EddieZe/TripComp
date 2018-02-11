/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 24-Jul-2015
 */
'use strict';

var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var logger = require('./../../infra/winstonLogger.js');

router.post('/', function (req, res) {

    logger.debug('sendEmail.post', logger.debug_Status.START);

    logger.info('sendEmail.post', JSON.stringify(req.body.message));

    res.send({
        responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
        responseData: null
    });

/*

    // create reusable transporter object using SMTP transport
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eddie.zeltser@gmail.com',
            pass: 'g5329722'
        }
    });

    /!*{
        service: 'gmail',
        auth: {
            user: "eddie.zeltser@gmail.com",
            pass: "g5329722"
        }
    });*!/

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'eddie.Zeltser@gmail.com', // sender address
        to: 'eddie.Zeltser@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world' // plaintext body
    };


// send mail with defined transport object
    transport.sendMail(mailOptions, function(err, info){
        if(err){
            logger.error('sendMail.post', err);
            res.send({
                    responseInfo: {isErrorOccurred: true, responseMsg: 'Error Occured', errorData: err},
                    responseData: null
            });
        }else{
            res.send({
                responseInfo: {isErrorOccurred: false, responseMsg: 'Success'},
                responseData: null
            });
        }
    });
*/

});

module.exports = router;