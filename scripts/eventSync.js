$(document).ready(function(){
	var calendar = $("#calendar").clndr({
		template: $('#calendar-template').html(),
		daysOfTheWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		events : [
			{date: '2015-05-10', title: 'Mothers Day'}
		]
	});

	var EVENTHANDLERS = (function(){
		

		$("body").on('click', '.day', function(e){
			if($(e.target).hasClass('fa') || $(e.target).hasClass('info_button_container')){
				console.log($(this));
				$("#eventDigestModal").modal();
			}else{
				$(this).toggleClass('selected');
			}
			
		});
	})();
});