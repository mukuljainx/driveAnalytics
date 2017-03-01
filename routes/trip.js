'use strict'

var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

/* GET home page. */
router.get('/init', function (req, res) {

    var carRegNum = req.query.regNumber;

    var createTrip = function(){
        // to be used if this car is using service for the first time
        Car.findOne({'regNumber' : carRegNum}, function(err, car){
            var carOwner = car.owner;
            var trip = new Trip();
            trip.vehicleRegNumber = req.query.regNumber;
            trip.boardingPoint = {x : req.query.x, y : req.query.y};
            trip.tripDriver = "unknown";
            trip.save(function(err, result){
                if(err){
                    return next(err);
                }
                else{
                    res.json({id : trip._id});
                }
            })
        })
    }

    Trip.findOne({'vehicleRegNumber' : carRegNum}).sort({'createdAt' : -1}).exec(function(err, tripDoc){
        if(err){
            return next(err);
        }
        else if(!tripDoc){
            createTrip();
            //TODO: Alter the owner about unidentified trip
        }
        else if(tripDoc){
            if(!tripDoc.status){
                res.json(tripDoc);
            }
        }
    })
});

router.post('/list', function (req, res) {
    Trip.find({'driverId' : driverid}, function(err, trips){
        if(err){
            return next(err);
        }
        else{
            res.json(trips);
        }
    })


});

router.post('/detail', function (req, res) {
    var tridId = req.query.id;

});

router.post('/add', function (req, res) {
    var trip = new Trip();
    trip.tripId = 123;
    trip.save(function(err, result){
        if(err){
            // TODO: handle err
            console.log(err);
        }
        else{
            console.log(result);
            res.end('true');
        }
    })
});


module.exports = router;
