// Router setup
pry = require('pryjs');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
router.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
var flash = require('connect-flash');
router.use(flash());

// Routes

// Delete a registry item
router.post('/:userId/home/:itemId', function(req, res){

});

// Delete a session
router.post('/logout', function(req, res){

});

// Home Page
router.get('/home', function(req, res){
  var viewData = {title: 'GiftRegistryFreedom'};
  res.render('home', viewData);
});

// User's Home Page
router.get('/:userId/home', function(req, res){
  res.render('index/show');
});

// Display a registry to view
router.get('/:userId/registry', function(req, res){
  res.send('user registry page route working');
});

// Create a new user
router.post('/home/register', function(req, res){

});

// Create a new session
router.post('/home/login', function(req, res){

});

// Create a new registry item
router.post('/:userId/home/newItem', function(req, res){

});

// Edit an item in the user's registry
router.put('/:userId/home/:itemId', function(req, res){

});





module.exports = router;
