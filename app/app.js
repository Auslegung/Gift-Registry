// Created by Jason Fry
// 2016-10-03

// Express
var express = require('express');
var app = express();

// Handle forms
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
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
mongoose.connect('mongodb://localhost/gift');

// Login sessions and validation
var passport = require('passport');
var User = require('./models/user.js');
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000);
