'use strict'
var express = require('express');
var path = require('path');
var http = require('http');
var os = require('os');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Influx = require('influx')
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//activating database
var influx = new Influx.InfluxDB('http://localhost:8086/express_response_db');
//end


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  var start = Date.now();

  res.on('finish', function () {
    var duration = Date.now() - start;
    console.log('Request to ' + req.path + ' took ' + duration + 'ms');

    influx.writePoints([{
      measurement: 'response_times',
      tags: { host: os.hostname() },
      fields: { duration: duration, path: req.path }
    }]).catch(function (err) {
      console.error('Error saving data to InfluxDB! ' + err.stack);
    });
  });
  return next();
});


app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
