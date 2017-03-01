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

## Multiple point data entry

Tags followed by values | Only tags are indexed values are not

- vehicle,driverId=sethia engineSpeed=3,throttle=123.9,vehicleSpeed=3 99500000000

## API

- Last trips (label, duration, km) list
- Last trips (label, duration, km) details per trip
- Driver Profile (according to trips) + No. of trips

## DB

- User table - label
- Trips [ with label, userid, tripid]
- Individual trips [ all details - speed, load, lat long per second]
- car [car details]


## How it works (tentative)

- Driver logs into the device, selects his car
- Starts the car
- A request is sent to server as soon as car starts to fetch a trip ID and driver ID
- Trip Session starts

### What if drivers starts the car first then logs

- If car haven't got the driver ID it will hit server again in every 5 sec to get the driver ID. [limit - 10 times]
- A reminder to owner can be sent that his car has started.


## How it works - solution

- Connect Mobile and car using bluetooth
