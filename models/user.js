var mongoose = require('mongoose');
// var mongoose_csv = require('mongoose-csv');

var userSchema = mongoose.Schema({
        googletoken       : String,
        googleid          : String,
        facebooktoken     : String,
        facebookid        : String,
        email             : String,
        name              : String,
        phoneNumber       : Number,
        city              : String,
        country           : String,
        valid             : Boolean,
        gender            : String,
        driverRating      : String,
        driverRatingPoint : Number,
        lastTripRating    : String,
        totalTrips        : Number,
        ownerId          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{timestamps : {}});
userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
