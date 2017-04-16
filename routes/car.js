'use strict'

var http = require('http');
var express = require('express');
var router = express.Router();
var Car =  require('../models/car.js');

router.post('add/check', function (req, res) {
    Car.findOne({'regNumber' : regNumber}, function(err,car){
        if(err) return next(err);
        else if(car){
            car.msg = true;
            res.json(car);
        }
        else{
            res.json({msg:false});
        }
    })
})

router.post('/add/complete', function (req, res) {
    var regNumber = req.body.regNumber;
    Car.count(function(err, count){
        var car = new Car();
        car.engine        = req.body.engine;
        car.model         = req.body.model;
        car.type          = req.body.type;
        car.age           = req.body.age;
        car.manufacturer  = req.body.manufacturer;
        car.regNumber     = regNumber //also the carid as it is unique
        car.status        = false;
        car.owner         = req.body.owner;
        car.save(function(err,car){
            if(err){
                return next(err);
            }
            else{
                res.json({msg : true});
            }
        })
    });
});

module.exports = router;
