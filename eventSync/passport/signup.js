var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	passport.use('signup', new LocalStrategy({
            usernameField : 'signupUsername',
            passwordField: 'signupPassword',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            console.log('123',req.session);
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){return done(err, false,{message:'Error in SignUp:'+err});}
                    
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, {message:'User Already Exists'});
                    // if there is no user with that email, create the user
                    } else {   
                        console.log('trying to create user');
                        var user = new User();

                        // set the user's local credentials
                        user.username = username;
                        user.password = createHash(password);
                        user.email = req.param('email');
                        user.color = req.param('color');

                        // save the user
                        user.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            } 
                            return done(null, user,{message:'User Registration succesful'});
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}