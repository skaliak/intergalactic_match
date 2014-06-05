var express = require('express');
var router = express.Router();

var passport = require('../passport_conf.js');
var User = require('../models/User.js');
var Profile = require('../models/Profile.js');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ahome', function(req, res) {
    if(req.user != null) {
        //find the user's profile
        Profile.findOne({ userid: new ObjectId(req.user._id) }, function(err, prof) {
            if (err) return console.error(err);
            //console.log('found profile?');

            res.sendfile('./views/angview.html');
        });

    } else {
        //user isn't logged in
        res.redirect('/login');
    }
});

router.get('/home', function(req, res) {
    if(req.user != null) {
        //find the user's profile
        Profile.findOne({ userid: new ObjectId(req.user._id) }, function(err, prof) {
            if (err) return console.error(err);
            console.log('found profile?');

            res.render('home', { user: req.user, profile : prof });
        });

    } else {
        //user isn't logged in
        res.redirect('/login');
    }
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/upload', function(req, res) {
    res.render('iupload');
});

router.get('/logout', function(req, res){
    req.logout();
    res.render('login', {logout: true});
});


router.get('/profiles', function(req, res) {
    if(req.user != null) {
        Profile.find(function(err, profs) {
            if (err) return console.error(err);

            res.render('profiles', {user : req.user, profiles : profs});
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/editprofile', function(req, res) {
    if(req.user != null) {
        //check for existing profile...

        Profile.findOne({ userid: new ObjectId(req.user._id) }, function(err, prof) {
            if (err) return console.error(err);
            console.log('found profile?');

            res.render('editprofile', prof);
        });

    } else {
        res.redirect('/login');
    }
});

//passport login

router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/ahome');
    },
    function(err, res){     //take this part out?
        console.log(err);
        res.send('you dun goofed!');
    }
);

//if flash messages work, use this:
//router.post('/login',
//    passport.authenticate('local',
//        { successRedirect: '/home',
//        failureRedirect: '/login',
//        failureFlash: true })
//);

router.post('/register', function(req, res) {
    User.register(
        new User(
            {
                username : req.body.username,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                joindate : new Date(Date.now())
            }),
        req.body.password,
        function(err, user) {
        if (err) {
            console.log(err);
            //return res.render('login', {tryregister: true, error: err});
            return res.send({success: false, error: err});
        }
        //res.redirect('/login');
        console.log(user);
        res.send({success: true});
    });
});

router.post('/postprofile', function(req, res) {
    if(req.user != null) {

        //should check for existing profile to update here...
        var prof = new Profile(
            {
                userid: req.user._id,
                seeking: req.body.seeking,
                age: req.body.age,
                seekingfor: req.body.seekingfor,
                planet: req.body.planet,
                interests: req.body.interests
            });
        prof.save(function (err, prof) {
            if (err) return console.error(err);
            console.log(prof);
            res.redirect('/home');
        });
    } else {
        res.send('error, not logged in');
    }
});

router.post('/postimage', function(req, res) {
    if(req.user != null) {

        //console.log(req);
        var file = req.files.uploadFile;

        if (file != null && file.mimetype.match(/image/)) {
            var ext = file.path.split(".")[1];
            var newPath = __dirname + '\\..\\public\\images\\' + req.user._id + '.' + ext;
            console.log(newPath);
            console.log(file.path);
            fs.renameSync(__dirname + '\\..\\' + file.path, newPath);
            res.send('success!');
        } else {
            res.send('upload error');
        }

    } else {
        res.send('error, not logged in');
    }
});

module.exports = router;
