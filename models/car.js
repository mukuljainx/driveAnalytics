var mongoose = require('mongoose');
// var mongoose_csv = require('mongoose-csv');

var carSchema = mongoose.Schema({
    engine        : String, // engine type or model
    model         : String, // car model
    type          : String,
    age           : Number,
    manufacturer  : String,
    vehicleRegNumber     : String,
    status        : Boolean, // if car is occupied or free, to be freed after each trip
    carId         : String,
    owner         : String, // who owns the car
    currentDriver : String, // who is current driver
},{timestamps : {}});
// userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('Car', carSchema);
