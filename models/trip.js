var mongoose = require('mongoose');
// var mongoose_csv = require('mongoose-csv');

var tripSchema = mongoose.Schema({
    ratingPoint     : Number,
    vehicleRegNumber: String,
    rating          : String,
    distanceCovered : String,
    averageSpeed    : String,
    driverId        : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if driver is known
    tripDriver      : String, // who is driving the car
    boardingPoint   : {x : Number, y : Number},
    destinationPoint: {x : Number, y : Number},
    destination     : String,
    boarding        : String,
    status          : Boolean // false means new
},{timestamps : {}});
// userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('Trip', tripSchema);
