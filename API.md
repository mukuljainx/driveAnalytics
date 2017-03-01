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
endpoint : ```/trip/detail```  
reqBody :
```
tripId : String
```
Return:
```
{
    parameter1Rating : Number,
    parameter2Rating : Number,
    parameter3Rating : Number,
    parameter4Rating : Number,
    [
        {
            "time":String,
            "engineLoad":Number,
            "engineSpeed":Number,
            "throttle":Number,
            "vehicleSpeed":Number,
            "latlongx" : Number,
            "latlongy" : Number,
        },...
    ]
}
```
