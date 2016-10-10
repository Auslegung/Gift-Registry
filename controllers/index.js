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
// TODO: in show.hbs, only show the edit button if a user is logged in.  Otherwise, allow the user to decrement the number needed
////////////////   DELETE ROUTES   ////////////////

// delete the current session
router.delete('/logout', function(req, res){
  req.logout();
  req.flash('info', 'Successfully logged out');
  res.render('home', {loggedIn: false});
});
////////////////   GET ROUTES   ////////////////

// render home page
router.get('/home', function(req, res){
  console.log('req.session.passport is:', req.session.passport);
  if (req.session.passport) {
    var viewData = {title: 'GiftRegistryFreedom', loggedIn: true};
  }
  else {
    var viewData = {title: 'GiftRegistryFreedom', loggedIn: false};
  }
  res.render('home', {title: viewData.title, loggedIn: viewData.loggedIn});
});

// render a user's gift registry
router.get('/:userId/home', function(req, res){ // TODO this doesn't display login form correctly if user is logged in but on another user's registry, I think
  User.findById(req.params.userId)
  .then(function(person){
    if (req.session.passport) {
      if (req.session.passport.user === person.username) {
          var loggedIn = true;
        } else {
          var loggedIn = false;
        }
      return {user: person, loggedIn: loggedIn};
    }
  })
  .catch(function(err){
    console.log(err);
  })
  .then(function(userAndLoggedIn){
    res.render('index/show', {user: userAndLoggedIn.user, loggedIn: userAndLoggedIn.loggedIn});
  });
});

// render page to edit item
router.get('/:userId/home/:itemId', function(req, res){
  console.log('req.session is:', req.session);
  console.log('req.params is:', req.params);

  User.findById(req.params.userId)
  .then(function(person){
    console.log('person.registryItems.id(req.params.itemId) is:', person.registryItems.id(req.params.itemId));
    if (req.session.passport) {
      if (req.session.passport.user === person.username) {
        var loggedIn = true;
      }
      else {
        var loggedIn = false;
      } // end if else
    } // end if
    return {
      loggedIn: loggedIn,
      user: person,
      item: person.registryItems.id(req.params.itemId)
    };
  }) // end .then()
  .catch(function(err){
    console.log(err);
  })
  // .then(function(userAndLoggedIn){
  //   var userAndItemAndLoggedIn = {
  //     user: userAndLoggedIn.person,
  //     item: userAndLoggedIn.person.registryItems.id(req.params.itemId),
  //     loggedIn: userAndLoggedIn.person.loggedIn
  //   }
  //   return userAndItemAndLoggedIn;
  // })
  // .catch(function(err){
  //   console.log(err);
  // })
  .then(function(viewData){
    res.render('index/edit', {
      user: viewData.user,
      item: viewData.item,
      loggedIn: viewData.loggedIn
    }) // end res.render()
  }) // end .then()
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
      res.render('index/results', {user: user});
    })
  } // end if
});

////////////////   POST ROUTES   ////////////////

// add a new user to the database TODO FIX ADD PARTNER TO USER
router.post('/home/register', function(req, res){
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

////////////////   PUT & DELETE ROUTE   ////////////////

// edit and delete an item in the user's gift registry
router.put('/:userId/home/:itemId', function(req, res){
  if (req.body.update === '') {
    User.findOneAndUpdate(
      {'_id': req.params.userId, 'registryItems._id': req.params.itemId},
      {$set: {
        'registryItems.$.name': req.body.name,
        // 'registryItems.$.image': req.body.image,
        'registryItems.$.description': req.body.description,
        'registryItems.$.new': req.body.new,
        'registryItems.$.stillNeeded': req.body.stillNeeded,
        'registryItems.$.registryType': 'baby'
      }}, // end $set:
      {upsert: true, returnNewDocument: true}
    ) // end User.findOneAndUpdate()
    .catch(function(err){
      console.log(err);
    })
    .then(function(updatedItem){
      res.redirect('/'+req.params.userId+'/home/')
    })
  } // end if
  else if (req.body.delete === '') {
    User.findOneAndUpdate(
      {'_id': req.params.userId},
      {$pull: {'registryItems': {'_id': req.params.itemId}}
    })
    .catch(function(err){
      console.log(err);
    })
    .then(function(){
      res.redirect('/'+req.params.userId+'/home/');
    })
  } // end if
});

module.exports = router;
