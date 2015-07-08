$(document).ready(function(){
	var CALENDAR = (function(){
		var clndrInstance = $("#calendar").clndr({
			template: $('#calendar-template').html(),
			daysOfTheWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			events : [
				{"date":"2015-01-01","title":"New Year's Day"},{"date":"2015-01-19","title":"Martin Luther King Day"},{"date":"2015-02-02","title":"Groundhog Day"},{"date":"2015-02-14","title":"Valentine's Day"},{"date":"2015-02-16","title":"Presidents Day"},{"date":"2015-03-08","title":"Daylight Savings"},{"date":"2015-03-17","title":"St. Patrick's Day"},{"date":"2015-04-01","title":"April Fool's Day"},{"date":"2015-04-05","title":"Easter"},{"date":"2015-04-22","title":"Earth Day"},{"date":"2015-05-05","title":"Cinco De Mayo"},{"date":"2015-05-10","title":"Mothers Day"},{"date":"2015-05-25","title":"Memorial Day"},{"date":"2015-06-21","title":"Father's Day"},{"date":"2015-07-04","title":"Independence Day1"},{"date":"2015-09-07","title":"Labor Day"},{"date":"2015-10-12","title":"Columbus Day"},{"date":"2015-10-31","title":"Halloween"},{"date":"2015-11-01","title":"Daylight Saving"},{"date":"2015-11-11","title":"Veterans' Day"},{"date":"2015-11-26","title":"Thanksgiving"},{"date":"2015-12-25","title":"Christmas Day"},{"date":"2015-12-31","title":"New Year's Eve"}
			],
			clickEvents : {
				click: function(target){
					setTimeout(function(){
						console.log(target);
						var clickedOnInfo = $(target.element).hasClass('active_info');
						
						if(clickedOnInfo){
							console.log(target);
							$("#eventDigestModal h4").text("Events on " + target.date._i);
							console.log(target.events);
							var eventsString;
							if(target.events.length){
								eventsString = "<ul>";
								for(var i=0; i<target.events.length;i++){
									eventsString += ("<li>" + target.events[i].title + "</li>");
								};
								eventsString += "</ul>";
							}else{
								eventsString = "<div>No events on this date.</div>"
							}
							
								
							
								
							console.log(eventsString);
							$("#eventDigestModal .modal-body").html(eventsString);
							$("#eventDigestModal").modal();
						}else if(!$(target.element).hasClass('adjacent-month')){
							$(target.element).toggleClass('selected');
							
						}

					},100);
					
				}
			}
		});
		console.log(dbEvents);
		var events2 = [];
		for(var i=0; i< dbEvents.length; i++){
			console.log(dbEvents[i].date);
			var currentObj = {"date": dbEvents[i].date, "title": dbEvents[i]['name']};
			events2.push(currentObj);
		}
		clndrInstance.addEvents(events2);
	})();
	var COLORPICKER = (function(){
		$('.color').colorPicker();
	})();


	var EVENTHANDLERS = (function(){
		$("body").on('click', '.day', function(e){
			if($(e.target).hasClass('fa') || $(e.target).hasClass('info_button_container')){
				$(this).addClass('active_info');
			}
		});
		$("#eventDigestModal").on('hidden.bs.modal',function(){
			$(".day").removeClass("active_info");
		});

		$("#enrollNowLink").click(function(){
			$("#loginModal").modal('hide');
			$("#enrollModal").modal('show');
		});
		
	})();
});