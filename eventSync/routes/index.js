var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	//res.render('index', { title: 'Express' });
   	var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "userlist" : docs
        });
    });
});

/*
API
*/

/* Enroll in EventSync */
router.post('/enroll', function(req, res) {
	//Get form values
	var db = req.db;
	var userName = req.body.enrollUserName;
	var email = req.body.enrollEmail;
	var password = req.body.enrollPassword;
	var color = req.body.enrollColor;

	//Set our Collection
	var collection = db.get('users');

	//Submit to the DB
	collection.insert({
		"userName":userName,
		"email":email,
		"password":password,
		"color":color
	},function(err,doc){
		if(err){
			// If it failed, return error
            res.send("There was a problem adding the information to the database.");
		}else{
			// If it worked, set the header so the address bar doesn't still say /enroll
            res.location("");
            // And forward to success page
            res.redirect("/");
		}
	});
});


/* Login to EventSync */
router.post('/login', function(req, res) {
    var db = req.db;
    var userName = req.body.loginUserName;
	var password = req.body.loginPassword;
    var collection = db.get('users');
    console.log(userName,password);
    collection.find({"userName":userName,"password":password},{},function(e,docs){
    	if(docs.length == 0){
    		res.send("Your User Name or Password is incorrect.");
    	}else{
			// If it worked, set the header so the address bar doesn't still say /login
	        res.location("");
	        // And forward to success page
	        res.redirect("/");
	        console.log(docs);
    	}
		
    });
});


module.exports = router;
