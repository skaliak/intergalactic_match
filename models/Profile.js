var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Profile = new Schema({
    userid : Schema.ObjectId,
    planet: String,
    seeking: String,
    age : Number,
    seekingfor: String,
    interests : String,
    about: String,
    hasimage: Boolean,
    headline: String
});


module.exports = mongoose.model('Profile', Profile);