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
    res.end('Hello world!');
});

router.get('/socket', function (req, res) {
    res.render('socket', {});
});

module.exports = router;
