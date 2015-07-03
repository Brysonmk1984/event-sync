var mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
	name : String,
	date : String,
	description : String
});