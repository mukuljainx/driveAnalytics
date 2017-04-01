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

Tags followed by values followed by ts | **Only tags are indexed values are not**

- vehicle,driverId=sethia,tripId=123 engineSpeed=3,throttle=123.9,vehicleSpeed=3 99500000000

## API

- Last trips (label, duration, km) list
- Last trips (label, duration, km) details per trip
- Driver Profile (according to trips) + No. of trips

## DB

- User table - label
- Trips [ with label, userid, tripid]
- Individual trips [ all details - speed, load, lat long per second]
- car [car details]

## Sending Data from Sensor

Through API in some time interval as given in [Official Doc](
https://www.influxdata.com/how-to-create-iot-influxdb-google-cloud-platform-part-4/).

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
- When car starts user should connect his mobile using bluetooth before starts
- Car Audio system (if available) will alert him to connect if he is not.
- If he forgets to connect trip will registered in the name of the owner, Later on Owner can change the driver by creating a request which driver have to accept to get registered for that trio.
- Car will know the driver ID if he is connected if not then car will assume owner as the driver.

## Note
Once after training model, we can tell how driver is driving at every point.

[Pyhton - NodeJS custom connect](http://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/)
