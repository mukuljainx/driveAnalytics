var mongoose = require('mongoose');
// var mongoose_csv = require('mongoose-csv');

var carSchema = mongoose.Schema({
    engine       : String,
    model        : String,
    type         : String,
    age          : Number,
    manufacturer : String,
    regNumber    : String,
});
// userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('Car', carSchema);
