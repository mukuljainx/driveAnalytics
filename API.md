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
{
    msg :
        {
            ratingPoint       : Number,
            vehicleRegNumber  : String,
            rating            : String,
            distanceCovered   : String,
            averageSpeed      : String,
            driverId          : String
            tripDriver        : String, // who is driving the car
            boardingPointx    : Number,
            boardingPointy    : Number,
            destinationPointx : Number,
            destinationPointy : Number,
            destination       : String,
            boarding          : String,
        }
}
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
    msg : {
        parameter1Rating : 2,
        parameter2Rating : 3,
        parameter3Rating : 3,
        parameter4Rating : 5,
        averageSpeed : 43.5,
        distanceCovered : 22.30,
        timeTaken : 30.75, // in minutes
    }
    status : true,
}
```
