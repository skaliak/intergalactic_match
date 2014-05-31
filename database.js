/**
 * Created by Peter on 5/28/2014.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'ec2-54-198-74-1.compute-1.amazonaws.com',
    user     : 'root',
    password : 'Kr3bnf67!',
    database : 'njs'
});


var mongoose = require('mongoose');
var mclient = mongoose.connection;
mclient.on('error', console.error);
mclient.once('open', function() {
    // Create your schemas and models here.
    console.log("mongo connected");

    //user model def moved to separate file models/User.js

});

mongoose.connect('mongodb://localhost/test');


//mysql connect
//connection.connect(function(err) {
//    if (err) {
//        console.error('error connecting: ' + err.stack);
//        return;
//    }
//
//    console.log('connected as id ' + connection.threadId);
//});

//module.exports = connection;
exports.mysql = connection;
exports.mongodb = mongoose;