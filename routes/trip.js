'use strict'

var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

router.get('/init', function (req, res) {

    var carRegNum = req.query.regNumber;
    var driverId  = req.query.driverId;

    //driver connects the phone with car then click on init trip
    // or if the phone is connected to the internet and car this will be automatically hit
    // after 1 minute of car driving with activating this

    Car.findOne({'regNumber' : carRegNum}, function(err, car){
        if(car){
            var carOwner = car.owner;
            var trip = new Trip();
            trip.vehicleRegNumber = req.query.regNumber;
            trip.boardingPoint = {x : req.query.x, y : req.query.y};
            trip.tripDriver = driverId;
            trip.destinationEntered = req.query.destinationEntered;
            trip.status = true;
            trip.save(function(err, result){
                if(err){
                    return next(err);
                }
                else{
                    res.json({id : trip._id}); //id with which data will be logged in influxdb
                }
            })
        }
        else if(!car){
            // TODO: if car is not there ask user to add the car with all required details
            // Car will always be there as we installs the hardware we registers the car
        }
        else if(err){
            return next(err);
        }
    })

});

router.post('/list', function (req, res) {
    Trip.find({}, function(err, trips){
        if(err){
            return next(err);
        }
        else{
            console.log(trips[0]);
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
                    "boardingPointy": trips[i].boardingPoint.y,
                    "tripId": trips[i]._id,
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
        return;
    }
    var tripId = req.body.tripId;

    //will search in influxDB on the basis of ID
    res.json({
            parameter1Rating : 2,
            parameter2Rating : 3,
            parameter3Rating : 3,
            parameter4Rating : 5,
            averageSpeed : 43.5,
            distanceCovered : 22.30,
            timeTaken : 30.75, // in minutes
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
            res.end(err);
        }
        else{
            res.json({id : trip._id});
        }
    })
});





module.exports = router;
