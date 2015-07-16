var express = require('express');
// var Event = require('../models/event');
var User = require('../models/user');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var ObjectId = require('mongoose').Types.ObjectId;
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){
	/* GET Login page */
	router.get('/login', function(req, res) {
		res.render('login', { title: 'Log In', user : 'Login'});
	});

	/* GET signup page */
	router.get('/signup', function(req, res) {
		req.logout();
		res.render('signup', { title: 'Sign Up', user : 'Login' });
	});

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('index', { 
			user: req.user,
			primaryEvents: req.user.primaryEvents
		});
		//console.log(req.user.primaryEvents);
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* Login to EventSync */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	/* Logout of EventSync */
	router.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});

	/* Add Event to EventSync */
	router.post('/events', function(req,res){
		var loggedInUser = req.user.username;
		User.findOne({"username" : loggedInUser},function(err,userInDb){
			if (err) return console.error(err);
  			// Create a new ObjectID
			var objectId = new ObjectID();
  			/* BK - Need to figure out how to check if record exists first */
  			/*console.log(11111111111111111111111,req.user.primaryEvents);
  			User.find*/
  			User.update(
  				{"username" : loggedInUser},
  				{
  				$push:{
  					primaryEvents:{
  						_id: objectId,
  						name: req.body.customEventName,
  						date: req.body.customEventDate,
  						description: req.body.customEventDescription
  					}
  				}
  				},
  				{upsert:true},
  				function(err){
  					console.log('made it to the calback');
  					if(err)
  						res.send(err);
  					res.render('index', { 
  						user: req.user,
  						primaryEvents: req.user.primaryEvents
  					});
  					//req.flash('success', {msg: 'Sign Up Success'});
  				}
  			);

		}); 
	});


	/* Delete Event from EventSync */
	router.delete('/events/:event_id', function(req,res){
		var passedEventId = req.params.event_id;
		var loggedInUserId = req.user._id;

		User.update({"_id" : loggedInUserId}, {$update: {"primaryEvents":{"_id":new ObjectId(passedEventId)}}},{ safe: true },function(){
			console.log('Update complete');

		});
		res.send("Event " + passedEventId + " has been deleted");

	});

	/* Update Event */
	router.put('/events/:event_id', function(req,res){
		var passedEventId = req.params.event_id;
		var loggedInUserId = req.user._id;

		User.update(
			{"_id" : loggedInUserId, "primaryEvents._id" : new ObjectId(passedEventId)},
			{
			$set:{
				"primaryEvents.$.name": req.body.name,
				"primaryEvents.$.date": req.body.date,
				"primaryEvents.$.description": req.body.description
			}
			},
			function(err){
				console.log('made it to the calback');
				console.log(passedEventId, loggedInUserId, req.body);
			}
		);

		res.send("Event " + passedEventId + " has been updated");

	});
	return router;
}
