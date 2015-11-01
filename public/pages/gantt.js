console.log("ping");

$.ajax({
	url: "api/sleep/161",
	accepts: "application/json; charset=utf-8",
	async: true,
	cache: false,
	method: "GET",
	data: {start: 1438293600-3600*24*31*6, end: 1438293600-3600*24*31*5},
	error: function (jqXHR, status, error)
	{
		if (error == "")
			error = "unknown";

		// Produce an alert to show the error
		alert("An error occurred, please try again.\nReason: " + error + "\nStatus: " + status);
	},
	success: function (data, status, jqXHR)
	{
		chart_data = [];
		currentCat = {category: "",segments:[]};
		$.each(data, function(index, obj) {
			start = new Date(obj.start);
			if(start.getHours() < 12)
			{
				offset = 60*24;
				day = new Date(start.getTime() - (1000 * 60 * 60 * 24))
			} else {
				offset = 0;
				day = start;
			}

			lable_day = day.getDate() + "/" + (day.getMonth()+1);

			// first time run
			if(currentCat.category == "")
			{
				currentCat.category = lable_day;
			}

			if(currentCat.category != lable_day)
			{
				chart_data.push(currentCat);
				currentCat = {category: lable_day,segments:[]};
			}

			currentCat.segments.push({
				start: start.getHours()*60+start.getMinutes() + offset,
				duration: obj.duration,
				duration_hour: Math.ceil(obj.duration/60*10)/10,
				color: "#7B742C",
				task: ""
			});

		});

		AmCharts.useUTC = true;
		var chart = AmCharts.makeChart( "chartdiv", {
			"type": "gantt",
			"period": "mm",
			"balloonDateFormat": "JJ:NN",
			"columnWidth": 0.5,
			"valueAxis": {
				"type": "date",
				"minimum": 720,
				"maximum": 2160
			},
			"brightnessStep": 10,
			"graph": {
				"fillAlphas": 1,
				"balloonText": "[[duration_hour]] hour(s)"
			},
			"rotate": false,
			"categoryField": "category",
			"segmentsField": "segments",
			"colorField": "color",
			"startDate": "2015-01-01",
			"startField": "start",
			"endField": "end",
			"durationField": "duration",
			"dataProvider": chart_data,
			"chartScrollbar": {},
			"chartCursor": {
				"valueBalloonsEnabled": false,
				"cursorAlpha": 0.1,
				"valueLineBalloonEnabled": true,
				"valueLineEnabled": true,
				"fullWidth": true
			},
			"responsive": {
				"enabled": true
			}
		} );
	}
});
