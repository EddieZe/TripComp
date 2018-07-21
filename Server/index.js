/**
==========TripComp==========
* Author: Eddie Zeltser
* Create Date : 27-Feb-2015 
*/
'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
