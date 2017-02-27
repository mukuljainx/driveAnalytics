'use strict'

var Influx = require('influx')
var http = require('http')
var os = require('os')
var express = require('express');
var router = express.Router();
var influx = require('../models/test.js').test;

/* GET home page. */
router.get('/', function (req, res) {
    setTimeout(function () {
        return res.end('Hello world!');
    }, Math.random() * 500);
});


router.get('/times', function (req, res) {
    influx.query('\n    select * from vehicle\n').then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.status(500).send(err.stack);
    });
});

module.exports = router;
