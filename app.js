/**
==========TripComp==========
* Author: Eddie Zeltser
* Create Date : 27-Feb-2015 
*/

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const prop = require('./scripts/envProp');
const logger = require('morgan');
const bodyParser = require('body-parser');

const getCountries = require('./Server/rests/main/getCountries');
const getCategories = require('./Server/rests/main/getCategories');
const places = require('./Server/rests/main/getPlaces');
const getPlaceReviews = require('./Server/rests/main/getPlaceReviews');
const getRatingForPlace = require('./Server/rests/main/getRatingForPlace');
const addNewSite = require('./Server/rests/main/addNewSite');
const getTimeZones = require('./Server/rests/main/getTimeZones');
const addNewCategory = require('./Server/rests/main/addNewCategory');
const addNewPlaceReview = require('./Server/rests/main/addNewPlaceReview');
const addNewPlace = require('./Server/rests/main/addNewPlace');
const sendEmail = require('./Server/rests/main/sendEmail');
const uploadImage = require('./Server/rests/main/uploadImage');
const addPlacePhotoSrc = require('./Server/rests/main/addPlacePhotoSrc');
const updateSitePhotoSrc = require('./Server/rests/main/updateSitePhotoSrc');
const googleRests = require('./Server/rests/google/googleMain');
const updatePlaceLinks = require('./Server/rests/main/updatePlaceLinks');
const getLinksTypes = require('./Server/rests/main/getLinksTypes');
const addLinkType = require('./Server/rests/main/addNewLinkType');

const app = express();

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
    const err = new Error('Not Found');
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
