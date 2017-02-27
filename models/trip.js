var mongoose = require('mongoose');
// var mongoose_csv = require('mongoose-csv');

var tripSchema = mongoose.Schema({
    ratingPoint     : Number,
    rating          : String,
    distanceCovered : String,
    averageSpeed    : String,
    userId          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    boardingPoint   : {x : Number, y : Number},
    destinationPoint: {x : Number, y : Number},
    destination     : String,
    boarding        : String,
});
userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('Trip', userSchema);
