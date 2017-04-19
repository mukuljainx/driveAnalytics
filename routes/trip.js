'use strict'

var express = require('express');
var Influx = require('influx');
var router = express.Router();
var Trip = require('../models/trip');
var Car = require('../models/car');
var tripUserQueue = [];
var tripUserQueuePosition = {};
var influxTripDetail = require('../models/tripDetail.js').model;
var json2csv = require('json2csv'); //to convert influx json to csv for ML part
var fs = require('fs');

router.post('/init', function (req, res, next) {

    var vehicleRegNumber = req.body.vehicleRegNumber;
    var driverId  = req.body.driverId;

    if(!vehicleRegNumber || !driverId || !req.body.x || !req.body.y || !req.body.boarding || !req.body.destinationEntered){
        res.end({status : false, msg : "something missing!"});
    }

    //driver connects the phone with car then click on init trip
    // or if the phone is connected to the internet and car this will be automatically hit
    // after 1 minute of car driving with activating this
    var carUpdate = {
        status : true,
        currentDriver : driverId
    }
    Car.findOneAndUpdate({'vehicleRegNumber' : vehicleRegNumber}, {$set : carUpdate}, {'new': true},function(err, car){
        if(car){
            Trip.count(function(err,tripCount){
                var carOwner = car.owner;
                var trip = new Trip();
                trip.vehicleRegNumber = req.body.vehicleRegNumber;
                trip.boardingPoint.x = req.body.x;
                trip.boardingPoint.y = req.body.y;
                trip.boarding = req.body.boarding;
                trip.driverId = driverId;
                trip.destinationEntered = req.body.destinationEntered;
                trip.status = true;
                trip.startTime = new Date();
                trip.tripId = "trip-" + (tripCount + 1);
                trip.save(function(err){
                    if(err){
                        next(err);
                    }
                    else{
                        //adding new user to the queue
                        var timeoutFunction = setTimeout(function () {
                            //alert member
                            console.log(1,'15 minutes ' + driverId);
                        },5000); //15 minutes = 900000

                        tripUserQueuePosition[driverId] = tripUserQueue.length;
                        tripUserQueue.push(timeoutFunction);
                        console.log(tripUserQueuePosition);
                        res.json({id : trip.tripId}); //id with which data will be logged in influxdb
                    }
                })
            })
        }
        else if(!car){
            res.json({status: false, msg : "Car not found"});
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
                    "driverId" : trips[i].driverId,
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

    //will search in mongoDB on the basis of ID
    Trip.findOne({'tripId' : tripId}, function(err, trip){
        if(err){
            return next(err);
        }
        else if(trip){
            res.json(trip);
        }
    })
});

router.post('/add', function (req, res) {
    var trip = new Trip();
    trip.tripId = 123;
    trip.save(function(err){
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
    trip.boardingPoint    =  req.body.boardingPoint;
    trip.destinationPoint =  req.body.destinationPoint;
    trip.status           =  req.body.status;
    trip.destination      =  req.body.destination;
    trip.boarding         =  req.body.boarding;
    trip.save(function(err){
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

router.post('/end', function (req, res) {

    var driverId = req.body.driverId;


    var position = tripUserQueuePosition[driverId];
    // tripUserQueuePosition.driverId.status = false;
    clearTimeout(tripUserQueue[position]);
    tripUserQueue.splice(position,1);

    for(var key in tripUserQueuePosition){
        if(tripUserQueuePosition.key > position){
            tripUserQueuePosition.key = (tripUserQueuePosition.key - 1);
        }
    }

    var spawn = require('child_process').spawn; // for python process
    var tripId = req.body.tripId;
    // if(!tripId) res.json({status : false, msg : "tripId is not provided"});
    var update = {
            destinationPoint : req.body.destinationPoint,
            endTime : new Date(),
    };
    var x = "123";
    var fields = ['time', 'driverId', 'engineSpeed', 'throttle', 'tripId', 'vehicleSpeed'];
    influxTripDetail.query(`select * from vehiclex1 where tripId = ${Influx.escape.stringLit(x)}`).then(function (result) {
        // res.json(result);
        var csv = json2csv({ data: result, fields: fields });
        fs.writeFile('file.csv', csv, function(err) {
            if (err) return next(err);
            // console.log('file saved');
            // res.json(result);
            var py    = spawn('python3', ['compute_input.py']),
                data = [1,2,3,4,5,6,7,8,9],
                dataString = '';

            // we are dumping our data to a python process
            py.stdin.write(JSON.stringify(data));
            py.stdin.end();

            py.stdout.on('data', function(data){
                // this `data` is from python process
                dataString += data.toString();
            });
            py.stdout.on('end', function(){
                console.log('Sum of numbers=',dataString);
                //store result in db also send user the results
                var tripUpdate = {
                    ratingPoint  : 9,
                    turnings     : 65,
                    laneWeaving  : 75,
                    laneDrifting : 85,
                    overSpeeding : 95,
                    carFollowing : 90,
                    normal       : 0.7,
                    drowsy       : 0.3,
                    aggressive   : 0.5
                    //7 paramerter + ratingPoint
                }
                Trip.findOneAndUpdate({'tripId' : tripId}, {$set : tripUpdate}, {'new': true},function (err, trip) {
                    if(err) return next(err);
                    else if(trip){
                        trip.status = true;
                        res.json(trip)
                    }
                    else{
                        res.end({status : false, msg : "trip not found!"});
                    }
                })
            });
        });
    }).catch(function (err) {
        res.status(500).send(err.stack);
    });
});




router.post('/alive', function (req, res) {
    var driverId = req.body.driverId;
    var position = tripUserQueuePosition.driverId;
    clearTimeout(tripUserQueue[position]);
    // delete tripUserQueue.driverId; // delete old
    tripUserQueue[position] =
        setTimeout(function () {
            //alert member
            console.log(2,'15 minutes ' + driverId);
        },5000); //15 minutes = 900000
    res.json({status : true});
});


module.exports = router;
