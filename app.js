var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');

var hbs = require('express-hbs');

var app = express();

// view engine setup

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '0xB16B00B5' }));

//init passport
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(path.join(__dirname, 'public')));
//app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
//app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
