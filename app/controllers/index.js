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

////////////////   DELETE ROUTES   ////////////////

// delete an item from a user's gift registry
router.delete('/:userId/home/:itemId', function(req, res){

});

// delete the current session
router.delete('/logout', function(req, res){
  req.logout();
  req.flash('info', 'Successfully logged out');
  res.redirect('/home');
});
////////////////   GET ROUTES   ////////////////

// render home page
router.get('/home', function(req, res){
  var viewData = {title: 'GiftRegistryFreedom'};
  res.render('home', viewData);
});

// render a user's home page
router.get('/:userId/home', function(req, res){
  // console.log('first name is:', req.user.firstName);
  // DEREK where does :userId come from?
  // DEREK how to get the user's registry to appear when searched for by someone else? (no one logged in)
  // DEREK why won't flash work
  //
  res.render('index/show', {user: req.user});
});

// router.post('search', function(req,res){
//   User.find(name: {req.body.name })
//
//   { _id = 1, name: 'derek'}
//     { _id = 2, name: 'derek jacobi'}
//
//   <a href='user._id/home' > Derek </a>
// })

// render page to edit item
router.get('/:userId/home/:itemId', function(req, res){
  res.render('index/edit');
});

// render search results
router.get('/home/results', function(req, res){
  res.render('index/results');
});

// render chosen gift registry
router.get('/:userId/registry', function(req, res){
  res.render('index/show');
});

////////////////   POST ROUTES   ////////////////

// add a new user to the database
router.post('/home/register', function(req, res){
  User.register(
    new User({
      username: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      partner: req.body.partner,
      createdAt: new Date(),
      updatedAt: new Date(),
      registryItems: []
    }),
    req.body.password,
    function(err, user){
      if (err) {
        console.log(err);
        return res.status(400).send('Could not register');
      } else {
        console.log('no error when creating ', user);
        req.flash('info', 'Registration was a success!');
      } // end if else
      res.redirect('/home');
    } // end function
  ) // end User.register
});

// create a new session
// testing if /home/login should be /home
// router.post('/home', passport.authenticate('local' {failureRedirect: '/home', failureFlash: true, successFlash: 'Welcome!'}), function(req, res){
router.post('/home/login', passport.authenticate('local', {failureRedirect: '/home', failureFlash: true, successFlash: 'Welcome!'}), function(req, res){
    req.session.save(function(err){
    if (err) {
      return next(err);
    } // end if
    User.findOne({email: req.session.passport.email}).exec()
    .then(function(){
      res.redirect('/' + req.user._id + '/home');
    }) // end then
    .catch(function(err){
      console.log('ERROR:', err);
      res.head(400);
    }) // end catch
  }) // end req.session.save
});



// create a new item in the user's gift registry
router.post('/:userId/home/newItem', function(req, res){

});

////////////////   PUT ROUTE   ////////////////

// edit an item in the user's gift registry
router.put('/:userId/home/:itemId', function(req, res){

});





module.exports = router;
