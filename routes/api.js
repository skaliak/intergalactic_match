var express = require('express');
var router = express.Router();

var passport = require('../passport_conf.js');
var User = require('../models/User.js');
var Profile = require('../models/Profile.js');
var ObjectId = require('mongoose').Types.ObjectId;

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
            console.log('found profile?');

            res.send(prof);
        });

    } else {
        res.send({error: 'not logged in'});
    }
});


module.exports = router;