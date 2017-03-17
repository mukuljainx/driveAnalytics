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
    Trip.find({}, function(err, trips){
        if(err){
            return next(err);
        }
        else{
            var data = [];
            for(var i=0; i< trips.length; i++){
                var temp = {
                    "createdAt" : trips[i].createdAt,
                    "boarding" : trips[i].boarding,
                    "destination" : trips[i].destination,
                    "status" : trips[i].status,
                    "tripDriver" : trips[i].tripDriver,
                    "averageSpeed" : trips[i].averageSpeed,
                    "distanceCovered" : trips[i].distanceCovered,
                    "rating" : trips[i].rating,
                    "vehicleRegNumber" : trips[i].vehicleRegNumber,
                    "ratingPoint" : trips[i].ratingPoint,
                    "destinationPointx": trips[i].destinationPoint.x,
                    "destinationPointy": trips[i].destinationPoint.y,
                    "boardingPointx": trips[i].boardingPoint.x,
                    "boardingPointy": trips[i]. boardingPoint.y,
                }
                data.push(temp);
            }
            res.json({ msg : data});
        }
    })
});

router.post('/detail', function (req, res) {
    if(!req.body.tripId){
        res.json({msg : "Trip ID Missing", status : false});
    }
    var tripId = req.body.tripId;

    //will search in influxDB on the basis of ID
    res.json({
            msg : {
                parameter1Rating : 2,
                parameter2Rating : 3,
                parameter3Rating : 3,
                parameter4Rating : 5,
                averageSpeed : 43.5,
                distanceCovered : 22.30,
                timeTaken : 30.75, // in minutes
            }
            status : true,
    });
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


router.post('/createlist', function (req, res) {
    var trip = new Trip();
    trip.ratingPoint      =  req.body.ratingPoint;
    trip.vehicleRegNumber =  req.body.vehicleRegNumber;
    trip.rating           =  req.body.rating;
    trip.distanceCovered  =  req.body.distanceCovered;
    trip.averageSpeed     =  req.body.averageSpeed;
    trip.driverId         =  req.body.driverId;
    trip.tripDriver       =  req.body.tripDriver;
    trip.boardingPoint    =  req.body.boardingPoint;
    trip.destinationPoint =  req.body.destinationPoint;
    trip.status           =  req.body.status;
    trip.destination      =  req.body.destination;
    trip.boarding         =  req.body.boarding;
    trip.save(function(err, result){
        if(err){
            // return next(err);
            console.log(err);
            res.end('khatam ho app');
        }
        else{
            res.json({id : trip._id});
        }
    })
});


module.exports = router;
