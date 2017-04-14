'use strict'

var Influx = require('influx');
var http = require('http');
var express = require('express');
var router = express.Router();
var influx = require('../models/tripDetail.js').model;
var json2csv = require('json2csv');
var fs = require('fs');
var io = require('socket.io')(http);

/* GET home page. */
router.get('/', function (req, res) {
    setTimeout(function () {
        return res.end('Hello world!');
    }, Math.random() * 500);
});

router.get('/times', function (req, res) {
    var x = "123"; // temporary
    var fields = ['time', 'driverId', 'engineSpeed', 'throttle', 'tripId', 'vehicleSpeed'];
    influx.query(`select * from vehiclex1
                  where tripId = ${Influx.escape.stringLit(x)}`).then(function (result) {
        // res.json(result);
        var csv = json2csv({ data: result, fields: fields });
        fs.writeFile('file.csv', csv, function(err) {
            if (err) throw err;
            console.log('file saved');
            res.json(result);
        });
    }).catch(function (err) {
        res.status(500).send(err.stack);
    });
});


router.get('/socket', function (req, res) {
    res.render('socket', {});
});


module.exports = router;
