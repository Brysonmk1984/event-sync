$(document).ready(function(){
	var globalEvents2 =[]
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
						var clickedOnInfo = $(target.element).hasClass('active_info');
						
						if(clickedOnInfo){
							$("#eventDigestModal h4").text(target.date.format("MMMM DD, YYYY"));
							var eventsString;
							if(target.events.length){
								eventsString = "";
								for(var i=0; i<target.events.length;i++){console.log(target.events[i]);
									eventsString += ("<tr><td>" + target.events[i].title + " </td><td> " + target.events[i].description + "</td><td><i class='fa fa-edit fa-lg click_update_event_link' data-id='" + target.events[i]._id + "'></i><i class='fa fa-remove fa-lg click_delete_event' data-id='" + target.events[i]._id + "'></i></td></tr>");
								};
								eventsString += "</ul>";
							}else{
								eventsString = "<div>No events on this date.</div>"
							}

							$("#eventDigestModal .modal-body table").append(eventsString);
							$("#eventDigestModal").modal();
						}else if(!$(target.element).hasClass('adjacent-month')){
							$(target.element).toggleClass('selected');
							
						}

					},100);
					
				}
			}
		});
		var events2 = [];
		for(var i=0; i< dbEvents.length; i++){
			var currentObj = {"date": dbEvents[i].date, "title": dbEvents[i]['name'], "description": dbEvents[i]['description'], "_id" : dbEvents[i]['_id']};
			events2.push(currentObj);
			globalEvents2.push(currentObj);
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
		
		$(document).on('click','.click_delete_event',function(){
			var eventId = $(this).data('id');
			var clickedItem = $(this);
			console.log(eventId);
			$.ajax({
			  method: "DELETE",
			  url: "/events/" + eventId,
			  success: function(data){
			  	console.log(data,clickedItem);
			  	clickedItem.closest('tr').remove();
			  }
			});
		});

		$(document).on('click','.click_update_event_link',function(){
			var eventId = $(this).data('id');
			var clickedItem = $(this);
			console.log(eventId);
			//console.log(globalEvents2);
			for(var i=0;i<globalEvents2.length; i++){
				if(globalEvents2[i]['_id'] == eventId){
					console.log(globalEvents2[i]);
					$("#hiddenEventId").val(eventId);
					$("#updateEventName").val(globalEvents2[i].title);
					$("#updateEventDate").val(globalEvents2[i].date);
					$("#updateEventDescription").val(globalEvents2[i].description);
				}
			}
			$("#eventDigestModal").modal('hide');
			$("#updateEventModal").modal('show');

			
			
		});
		$(document).on('click','.click_update_event',function(){
			var eventName = $("#updateEventName").val();
			var eventDescription = $("#updateEventDescription").val();
			var eventDate = $("#updateEventDate").val();
			var eventId = $("#hiddenEventId").val();
			var dataString = 'name='+eventName+'&date='+eventDate+'&description='+eventDescription;
			console.log(dataString);
			$.ajax({
			  method: "PUT",
			  data: dataString,
			  url: "/events/" + eventId,
			  success: function(data){
			  	console.log(data);
			  	$("#updateEventModal").modal('hide');
			  }
			});
		});
	})();
});