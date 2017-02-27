'use strict';
var Influx = require('influx');

exports.test = new Influx.InfluxDB({
    host: 'localhost',
    database: 'express_response_db',
    schema: [
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
