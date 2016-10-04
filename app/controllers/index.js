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

// Render Home Page
router.get('/home', function(req, res){
  var viewData = {title: 'GiftRegistryFreedom'};
  res.render('home', viewData);
});

// Render User's Home Page
router.get('/:userId/home', function(req, res){
  res.render('index/show');
});

// RENDER PAGE TO EDIT ITEM
router.get('/:userId/home/:itemId', function(req, res){
  res.render('index/edit');
});

// RENDER SEARCH RESULTS
router.get('/home/results', function(req, res){
  res.render('index/results');
});

// RENDER CHOSEN GIFT REGISTRY
router.get('/:userId/registry', function(req, res){
  res.render('index/show');
});

// ADD A NEW USER TO THE DATABASE
router.post('/home/register', function(req, res){

});

// CREATE A NEW SESSION
router.post('/home/login', function(req, res){

});

// CREATE A NEW ITEM IN THE USER'S GIFT REGISTRY
router.post('/:userId/home/newItem', function(req, res){

});

// EDIT AN ITEM IN THE USER'S GIFT REGISTRY
router.put('/:userId/home/:itemId', function(req, res){

});





module.exports = router;
