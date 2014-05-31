var express = require('express');
var router = express.Router();
var db = require('../database.js');


/* GET users listing. */
router.get('/mysql', function(req, res) {
    db.mysql.query("SELECT * FROM wusers", function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        //res.render('users', { title: 'Users', users: rows });
        res.send(rows);
    });
});

router.get('/mongo', function(req, res) {
    //db.mongodb.query()
        //res.render('users', { title: 'Users', users: rows });
    db.mongodb.model('User').find(function(err, users) {
        if (err) return console.error(err);
        console.log(users);
        res.send(users);
    });
});

router.get('/profiles', function(req, res) {
    if(req.user != null) {
        db.mongodb.model('Profile').find(function (err, users) {
            if (err) return console.error(err);
            console.log(users);
            res.send(users);
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
