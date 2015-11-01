AmCharts.useUTC = true;
var chart = AmCharts.makeChart( "chartdiv", {
	"type": "gantt",
	"period": "mm",
	"balloonDateFormat": "JJ:NN",
	"columnWidth": 0.3,
	"valueAxis": {
		"type": "date",
		"minimum": 720,
		"maximum": 2160
	},
	"brightnessStep": 10,
	"graph": {
		"fillAlphas": 1,
		"balloonText": ""
	},
	"rotate": false,
	"categoryField": "category",
	"segmentsField": "segments",
	"colorField": "color",
	"startDate": "2015-01-01",
	"startField": "start",
	"endField": "end",
	"durationField": "duration",
	"dataProvider": [ {
		"category": "Mon-Tue",
		"segments": [ {
			"start": 13*60+22,
			"duration": 100,
			"color": "#7B742C",
			"task": "Task #1"
		}, {
			"start": 15,
			"duration": 2,
			"color": "#7E585F",
			"task": "Task #2"
		}, {
			"duration": 2,
			"color": "#CF794A",
			"task": "Task #3"
		} ]
	}, {
		"category": "Tue-Wed",
		"segments": [ {
			"start": 10,
			"duration": 2,
			"color": "#7E585F",
			"task": "Task #2"
		}, {
			"duration": 1,
			"color": "#CF794A",
			"task": "Task #3"
		}, {
			"duration": 4,
			"color": "#7B742C",
			"task": "Task #1"
		} ]
	}, {
		"category": "Wed-Thu",
		"segments": [ {
			"start": 12,
			"duration": 2,
			"color": "#7E585F",
			"task": "Task #2"
		}, {
			"start": 16,
			"duration": 2,
			"color": "#FFE4C4",
			"task": "Task #4"
		} ]
	}, {
		"category": "Thu-Fri",
		"segments": [ {
			"start": 9,
			"duration": 6,
			"color": "#7B742C",
			"task": "Task #1"
		}, {
			"duration": 4,
			"color": "#7E585F",
			"task": "Task #2"
		} ]
	}, {
		"category": "Fri-Sat",
		"segments": [ {
			"start": 8,
			"duration": 1,
			"color": "#CF794A",
			"task": "Task #3"
		}, {
			"duration": 4,
			"color": "#7B742C",
			"task": "Task #1"
		} ]
	}, {
		"category": "Sat-Sun",
		"segments": [ {
			"start": 15,
			"duration": 3,
			"color": "#7E585F",
			"task": "Task #2"
		} ]
	}, {
		"category": "Sun-Mon",
		"segments": [ {
			"start": 15,
			"duration": 3,
			"color": "#7E585F",
			"task": "Task #2"
		} ]
	}  ],
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