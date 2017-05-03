# API's

### Initiate trip
Type : Post  
endpoint : ```/trip/init```  
reqBody :
```
{
    driverId           : String,
    vehicleRegNumber   : String,
    x                  : Number,
    y                  : Number,
    boarding           : String,
    destinationEntered : String
}
```
Return:
```
{
    tripId : String
}
```

### end trip
Type : Post  
endpoint : ```/trip/end```  
reqBody :
```
{
    x                  : Number,
    y                  : Number,
    destination        : String, (location obtained from geo points)
    tripId             : String,
    driverId           : String,
    vehicleRegNumber   : String
}
```
Return:
```
{
    tripId          : String,
    ratingPoint     : Number,
    vehicleRegNumber: String,
    label           : String,
    distanceCovered : String,
    averageSpeed    : String,
    driverId        : String, // who is driving the car
    boardingPoint   : {x : Number, y : Number},
    destinationPoint: {x : Number, y : Number},
    status          : Boolean, // false means new, not used
    destination  : String,
    boarding        : String,
    startTime       : Date,
    endTime         : Date,
    turnings        : Number, //score (base 100)
    laneWeaving     : Number, //score (base 100)
    laneDrifting    : Number, //score (base 100)
    overSpeeding    : Number, //score (base 100)
    carFollowing    : Number, //score (base 100)
    normal          : Number, //ratio (driver condition)
    drowsy          : Number, //ratio (driver condition)
    aggressive      : Number, //ratio (driver condition)
    roadType        : String
}
```

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
    msg :[
            {
                ratingPoint       : Number,
                vehicleRegNumber  : String,
                label             : String,
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
        ]
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
    ratingPoint        : Number,
    vehicleRegNumber   : String,
    label              : String,
    distanceCovered    : String,
    averageSpeed       : String,
    driverId           : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if driver is known
    tripDriver         : String, // who is driving the car
    boardingPointx     : Number,
    boardingPointy     : Number,
    destinationPointx  : Number,
    destinationPointy  : Number,
    status             : Boolean, // false means new, not used
    destination : String,
    boarding           : String,
    startTime          : Date,
    endTime            : Date,
    turnings        : Number, //score (base 100)
    braking         : Number, //score (base 100)
    overSpeeding    : Number, //score (base 100)
    acceleration    : Number, //score (base 100)
    normal          : Number, //ratio (driver condition)
    drowsy          : Number, //ratio (driver condition)
    roadType       : String,
    aggressive      : Number //ratio (driver condition)
    status             : true,
}
```

### Trip Details
Type : Post  
endpoint : ```/trip/data```  
reqBody :
```
userId : String
```
Return:
```
{
    status : true
}
```


## Login/Signuo

### Signup
Type : Post
endpoint : ```user/user_register_complete_mobile/google```
reqBody:
```
{
    phoneNumber      
    country          
    dateOfBirth      
    city             
    gender           
    name             
    email            
    valid            
    googleid         
    googletoken      
}
```
