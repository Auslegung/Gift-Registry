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
    User.findById(req.params.userId)
  .then(function(user){
    if (Object.keys(req.sessionStore.sessions).length) { // if username TODO
      var loggedIn = true;
    } else {
      var loggedIn = false;
    }
    return {user: user, loggedIn: loggedIn};
  })
  .then(function(userAndLoggedIn){
    res.render('index/show', {user: userAndLoggedIn.user, loggedIn: userAndLoggedIn.loggedIn});
  });
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
  User.findById(req.params.userId)
  .then(function(user){
    return user.registryItems.id(req.params.itemId)
  })
  .then(function(item){
    res.render('index/edit', {item: item})
  })
});

// render search results
router.get('/home/results', function(req, res){
  var searchString = req.query.searchString;
  if (searchString) {
    var names = searchString.split(' ');
    var firstName = names[0];
    var lastName = names[names.length - 1];
    new Promise(function(resolve, reject){
      resolve();
    })
    .then(function(){
      return User.find({ fullName: new RegExp(searchString, 'i') });
    })
    .catch(function(err){
      console.log(err);
    })
    .then(function(user){
      // console.log(user);
      res.render('index/results', {user: user});
    })
  } // end if
});

// render chosen gift registry
router.get('/:userId/registry', function(req, res){
  res.render('index/show');
});

////////////////   POST ROUTES   ////////////////

// add a new user to the database
router.post('/home/register', function(req, res){
  // console.log(req.body);
  User.register(
    new User({
      username: req.body.username,
      fullName: req.body.firstName + ' ' + req.body.lastName,
      partner: req.body.partner,
      createdAt: new Date(),
      updatedAt: new Date(),
      registryItems: [],
      'address.address1': req.body.address1,
      'address.address2': req.body.address2,
      'address.city': req.body.city,
      'address.state': req.body.state,
      'address.zip': req.body.zip,
    }),
    req.body.password,
    function(err, user){
      if (err) {
        console.log(err);
        return res.status(400).send('Could not register');
      } else {
        // console.log('no error when creating ', user);
        req.flash('info', 'Registration was a success!');
      } // end if else
      res.redirect('/home');
    } // end function
  ) // end User.register
});

// create a new session
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
  // console.log(req.user);
  User.findByIdAndUpdate(
    req.user._id,
    {$push: {
      registryItems: {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        new: req.body.new,
        quantity: req.body.quantity,
        note: req.body.note,
        locations: [req.body.locations],
        stillNeeded: req.body.stillNeeded,
        registryType: 'baby'
      }}}, // end $push registryItems
    {upsert: true, new: true},
    function(err){
      if (err) {
        console.log(err);
      }
      res.redirect('/' + req.user._id + '/home');
    }
  ) // end findByIdAndUpdate
});

////////////////   PUT ROUTE   ////////////////

// edit an item in the user's gift registry
router.put('/:userId/home/:itemId', function(req, res){
  console.log('req.params inside put route:', req.params);
  console.log('req.body:', req.body);
  console.log('res:', res);
  // should be able to do a findOneAndUpdate on the itemId directly, without
  // going through the User first
  User.findOneAndUpdate(
    {id: req.params.userId},
    {$set: {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      new: req.body.new,
      stillNeeded: req.body.stillNeeded,
      registryType: 'baby'
    }});
});





module.exports = router;
