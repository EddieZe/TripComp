/**
==========TripComp==========
* Author: Eddie Zeltser
* Create Date : 27-Feb-2015 
*/

var express = require('express');
var ejs = require('ejs');
var path = require('path');
var prop = require('./scripts/envProp');
var logger = require('morgan');
var bodyParser = require('body-parser');

var getCountries = require('./Server/rests/main/getCountries');
var getCategories = require('./Server/rests/main/getCategories');
var places = require('./Server/rests/main/getPlaces');
var getPlaceReviews = require('./Server/rests/main/getPlaceReviews');
var getRatingForPlace = require('./Server/rests/main/getRatingForPlace');
var addNewSite = require('./Server/rests/main/addNewSite');
var getTimeZones = require('./Server/rests/main/getTimeZones');
var addNewCategory = require('./Server/rests/main/addNewCategory');
var addNewPlaceReview = require('./Server/rests/main/addNewPlaceReview');
var addNewPlace = require('./Server/rests/main/addNewPlace');
var sendEmail = require('./Server/rests/main/sendEmail');
var uploadImage = require('./Server/rests/main/uploadImage');
var addPlacePhotoSrc = require('./Server/rests/main/addPlacePhotoSrc');
var updateSitePhotoSrc = require('./Server/rests/main/updateSitePhotoSrc');
var googleRests = require('./Server/rests/google/googleMain');
var updatePlaceLinks = require('./Server/rests/main/updatePlaceLinks');
var getLinksTypes = require('./Server/rests/main/getLinksTypes');
var addLinkType = require('./Server/rests/main/addNewLinkType');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Client/templates'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('env', prop.APP_MODE);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'Client/templates')));

app.use('/getCountries', getCountries);
app.use('/getCategories', getCategories);
app.use('/getPlaces', places);
app.use('/getPlaceReviews', getPlaceReviews);
app.use('/getRatingForPlace', getRatingForPlace);
app.use('/addNewSite', addNewSite);
app.use('/getTimeZones', getTimeZones);
app.use('/addNewCategory', addNewCategory);
app.use('/addNewPlaceReview', addNewPlaceReview);
app.use('/addNewPlace', addNewPlace);
app.use('/sendEmail', sendEmail);
app.use('/uploadImage', uploadImage);
app.use('/addPlacePhotoSrc', addPlacePhotoSrc);
app.use('/updateSitePhotoSrc', updateSitePhotoSrc);
app.use('/google', googleRests);
app.use('/updatePlaceLinks', updatePlaceLinks);
app.use('/getLinksTypes', getLinksTypes);
app.use('/addLinkType', addLinkType);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('404', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('404', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
