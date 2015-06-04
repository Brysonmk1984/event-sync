//BASE SETUP
//========================================================
// call the packages we need
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');

// Connect to DB
mongoose.connect('mongodb://localhost/eventSync');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {console.log('DB connection made!');});



// Declare App
var app = express();

//VIEW ENGINE SETUP
//=======================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//MIDDLEWARE CONFIGURATION
//=======================================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());



// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);



//ROUTES FOR OUR API
//=======================================================
var routes = require('./routes/index')(passport);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;