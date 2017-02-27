'use strict';
var Influx = require('influx');

exports.test = new Influx.InfluxDB({
    host: 'localhost',
    database: 'express_response_db',
    schema: [
        {
            measurement: 'response_times',
            fields: {
                path: Influx.FieldType.STRING,
                duration: Influx.FieldType.INTEGER
            },
            tags: ['host']
        },
        {
            measurement: 'vehicleSpeed', //km/h
            fields: {
                speed : Influx.FieldType.INTEGER,
            },
            tags: ['host']
        },
        {
            measurement: 'engineSpeed', //km/h
            fields: {
                speed : Influx.FieldType.INTEGER,
            },
            tags: ['host']
        },
        {
            measurement: 'throttle', //km/h
            fields: {
                percentage : Influx.FieldType.FLOAT,
            },
            tags: ['host']
        },
        {
            measurement: 'engineLoad', //km/h
            fields: {
                percentage : Influx.FieldType.FLOAT,
            },
            tags: ['host']
        },
        {
            measurement: 'vehicle', //km/h
            fields: {
                engineLoad : Influx.FieldType.FLOAT,
                throttle : Influx.FieldType.FLOAT,
                vehicleSpeed : Influx.FieldType.FLOAT,
                engineSpeed : Influx.FieldType.FLOAT,
                latlongx : Influx.FieldType.FLOAT,
                latlongy : Influx.FieldType.FLOAT,
            },
            tags: ['host']
        },
    ]
});
