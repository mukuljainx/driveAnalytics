'use strict'

var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

/* GET home page. */
router.get('/init', function (req, res) {
    Trip.count(function(err,tripCount){
        var trip = new Trip();
        trip.tripId = count;
    })
});


module.exports = router;
