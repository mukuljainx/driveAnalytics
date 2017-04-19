'use strict'

var http = require('http');
var express = require('express');
var router = express.Router();
var Car =  require('../models/car.js');

router.post('add/check', function (req, res) {
    Car.findOne({'regNumber' : regNumber}, function(err,car){
        if(err) return next(err);
        else if(car){
            car.status = true;
            res.json(car);
        }
        else{
            res.json({status:false});
        }
    })
})

router.post('/add/complete', function (req, res) {
    var regNumber = req.body.regNumber;
    Car.findOne({'regNumber' : regNumber}, function(err,car){
        if(err) return next(err);
        else if(car) res.json({status : false, msg : "car already exist"});
        else{
            Car.count(function(err, count){
                var newCar = new Car();
                newCar.engine        = req.body.engine;
                newCar.model         = req.body.model;
                newCar.type          = req.body.type;
                newCar.age           = req.body.age;
                newCar.manufacturer  = req.body.manufacturer;
                newCar.regNumber     = regNumber //also the carid as it is unique
                newCar.status        = false;
                newCar.owner         = req.body.owner;
                newCar.save(function(err){
                    if(err){
                        return next(err);
                    }
                    else{
                        res.json({status : true});
                    }
                })
            });
        }
    });
});

module.exports = router;
