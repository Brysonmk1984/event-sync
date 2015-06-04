var express = require('express');
var router = express.Router();

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
		res.render('signup', { title: 'Sign Up', user : 'Login' });
	});

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('index', { 
			user: req.user, 
		});
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
	return router;
}
