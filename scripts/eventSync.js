$(document).ready(function(){
	var CALENDAR = (function(){
		$("#calendar").clndr({
			template: $('#calendar-template').html(),
			daysOfTheWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			events : [
				{date: '2015-05-10', title: 'Mothers Day'}
			],
			clickEvents : {
				click: function(target){
					setTimeout(function(){
						//console.log(target.element);
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
						}else{
							$(target.element).toggleClass('selected');
						}

					},100);
					
				}
			}
		});
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


		
	})();
});