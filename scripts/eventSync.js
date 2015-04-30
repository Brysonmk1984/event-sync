$(document).ready(function(){
	var calendar = $("#calendar").clndr({
		template: $('#calendar-template').html(),
		daysOfTheWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		events : [
			{date: '2015-05-10', title: 'Mothers Day'}
		],
		clickEvents : {
			click: function(target){
				setTimeout(function(){
					console.log(target.element);
					var clickedOnInfo = $(target.element).hasClass('active_info');
					
					if(clickedOnInfo){
						//Do stuff with day data
						$("#eventDigestModal").modal();
					}else{console.log(2);
						$(this).toggleClass('selected');
						// still need to remove class when modal closes
					}

				},100);
				
			}
		}
	});

	var EVENTHANDLERS = (function(){
		

		$("body").on('click', '.day', function(e){
			if($(e.target).hasClass('fa') || $(e.target).hasClass('info_button_container')){
				$(this).addClass('active_info');
			}
			
		});
	})();
});