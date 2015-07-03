var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	username: String,
	password: String,
	email: String,
	color: String,
	primaryEvents: Array,
	secondaryEvents: Array
});