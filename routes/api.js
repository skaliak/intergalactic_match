var express = require('express');
var router = express.Router();

var passport = require('../passport_conf.js');
var User = require('../models/User.js');
var Profile = require('../models/Profile.js');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');

//routes go here
router.get('/profiles', function(req, res) {
    if(req.user != null) {
        Profile.find(function(err, profs) {
            if (err) return console.error(err);

            res.send(profs);
        });
    } else {
        res.send({error: 'not logged in'});
    }
});

router.get('/myprofile', function(req, res) {
    if(req.user != null) {
        //check for existing profile...

        Profile.findOne({ userid: new ObjectId(req.user._id) }, function(err, prof) {
            if (err) return console.error(err);
            //console.log('found profile?');

            res.send(prof);
        });

    } else {
        res.send({error: 'not logged in'});
    }
});

router.get('/myprofile', function(req, res) {
    if(req.user != null) {
        //check for existing profile...

        res.send({ id: req.user._id, firstname: req.user.firstname, lastname: req.user.lastname });

    } else {
        res.send({error: 'not logged in'});
    }
});

router.post('/updateProfile', function(req, res) {
    if(req.user != null) {

        var prof = req.body;
        prof.save(function (err, prof) {
            if (err) return console.error(err);
            console.log(prof);
            res.send('ok');
        });
    } else {
        res.send({error: 'not logged in'});
    }
});


router.post('/postimage', function(req, res) {
    if(req.user != null) {

        //console.log(req);
        var file = req.files.uploadFile;
        //console.log(req);
        //console.log(req.files);
        //console.log(file);
        if (file != null && file.mimetype.match(/image/)) {
            var ext = file.path.split(".")[1];
            var newPath = __dirname + '\\..\\public\\images\\' + req.user._id + '.' + ext;
            console.log(newPath);
            //console.log(file.path);
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