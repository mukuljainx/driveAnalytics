## Stack

- Node.js
- Express.js
- InfluxDB

## Data Transfer

Sensor to direct DB using port 8086 (to save time processing),
[more info.]( https://docs.influxdata.com/influxdb/v1.2/guides/querying_data/)


## Useful links

- [DB Management](https://docs.influxdata.com/influxdb/v0.13/query_language/database_management/#delete-measurements-with-drop-measurement)
- [DB API / Querying data](https://docs.influxdata.com/influxdb/v1.2/guides/querying_data/)

Save per 5 second data into file then transfer to DB

## To Start InfluxDB

- ```influxd``` (starts the server)
- ```influx```  (starts the CLI)


## API

- Last trips (label, duration, km) list
- Last trips (label, duration, km) details per trip
- Driver Profile (according to trips) + No. of trips

## DB

- User table - label
- Trips [ with label, userid, tripid]
- Individual trips [ all details - speed, load, lat long per second]
- car [car details]
