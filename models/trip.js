var mongoose = require('mongoose');
// var mongoose_csv = require('mongoose-csv');

var tripSchema = mongoose.Schema({
    tripId          : String,
    ratingPoint     : Number,
    vehicleRegNumber: String,
    rating          : String,
    distanceCovered : String,
    averageSpeed    : String,
    driverId        : String, // who is driving the car
    boardingPoint   : {x : Number, y : Number},
    destinationPoint: {x : Number, y : Number},
    status          : Boolean, // false means new, not used
    destinationEntered : String,
    destinationLocated : String,
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
    aggressive      : Number //ratio (driver condition)
},{timestamps : {}});
// userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('Trip', tripSchema);
