
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

//passport.use(new LocalStrategy(check_auth_user));

var User = require('./models/User.js');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function check_auth_user(username,password,done,public_id){

    if(username === "jimbob" && password === "hunter1"){

        var user = {firstname: "jim", lastname: "bob"};
        //serialize the query result save whole data as session in req.user[] array
        //this is not optional
        passport.serializeUser(function(res, done) {
            done(null,res);
        });

        passport.deserializeUser(function(id, done) {
            done(null,res);

        });

        console.log(user);
        return done(null, user);
    }else{
        return done(null, false, { message: 'Bad login.' });

    }

}

module.exports = passport;