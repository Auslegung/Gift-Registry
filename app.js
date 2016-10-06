// Created by Jason Fry
// 2016-10-03
// General Assembly WDIr Project 02

// Express
var express = require('express');
var app = express();

// Serve Static Assets
app.use(express.static(__dirname + '/public'));

// Handle forms
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.json()); // delete if not helpful
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Express & Handlebars
var hbs = require('hbs');
app.set('view engine', 'hbs');
require('handlebars-form-helpers').register(hbs.handlebars);

// Debugging
pryjs = require('pryjs');
var logger = require('morgan');
app.use(logger('dev'));

// User Messaging
var flash = require('connect-flash');
app.use(flash());

// Routing
app.use('/', require('./controllers/index.js'));

// Promises
var mongoose = require('mongoose');
// Mongoose
mongoose.Promises = global.Promise;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/gift';
mongoose.connect(mongoURI);

// Login sessions and validation
var passport = require('passport');
var User = require('./models/user.js');
var localStrategy = require('passport-local').Strategy;
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  console.log(req);
  res.locals.user = req.user;
  next();
});
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT || 3000 );
