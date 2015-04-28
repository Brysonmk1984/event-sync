$(document).ready(function(){
	$("#calendar").clndr({
		template: $('#calendar-template').html(),
		daysOfTheWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		events : [
			{date: '2015-05-10', title: 'Mothers Day'}
		]
	});
});