# API's

### All trip list
Type : Post  
endpoint : ```/trip/list```  
reqBody :
```
driverId : String
```
Return:
```
ratingPoint     : Number,
vehicleRegNumber: String,
rating          : String,
distanceCovered : String,
averageSpeed    : String,
driverId        : String
tripDriver      : String, // who is driving the car
boardingPoint   : {x : Number, y : Number},
destinationPoint: {x : Number, y : Number},
destination     : String,
boarding        : String,
```

### Trip Details
Type : Post  
endpoint : ```/trip/list```  
reqBody :
```
tridId : String
```
Return:
```
[
    {
        "time":"1970-01-01T00:00:01.000Z",
        "engineLoad":16.1,
        "engineSpeed":3,
        "throttle":3.9,
        "vehicleSpeed":3,
        "latlongx" : 123123,
        "latlongy" : 12123,
    },...
]
```
