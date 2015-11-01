$(function() {
	$("#nav-home").click(function() {getPage("home")});
	$("#nav-list").click(function() {getPage("list")});
	$("#nav-hist").click(function() {getPage("hist")});
	getPage("home");
});

experiments = [{id: 0, num: 1, difc: "L", desc: "Sleep Basics", expl: "A basic lesson about sleep"},
	{id: 1, num: 1, difc: 1, desc: "No Screens", expl: "Don't use a screen for 2 hours before going to bed"},
	{id: 2, num: 2, difc: 1, desc: "Read Before Bed", expl: "Read a book for an hour before bed"},
	{id: 3, num: 3, difc: 1, desc: "Earplugs", expl: "Wear earplugs in bed"},
	{id: 4, num: 4, difc: 1, desc: "Eat almond butter", expl: "Eat some almond butter in the evening"},
	{id: 5, num: 5, difc: 2, desc: "No alcohol before bed", expl: "Don't drink alcohol 4 hours before bed"},
	{id: 6, num: 6, difc: 3, desc: "Take morning ice bath", expl: "Take an icebath in the morning to help wake you up"}];

hist = [{id: 1, res:"4/5"},{id: 3, res:"2/5"}]	

function getPage(page)
{
	scripArray = ["gantt","home"];

	$.ajax({
		url: "pages/" + page + ".inc",
		accepts: "application/html; charset=utf-8",
		async: true,
		cache: false,
		method: "GET",
		data: "",
		error: function (jqXHR, status, error)
		{
			if (error == "")
				error = "unknown";

			// Produce an alert to show the error
			alert("An error occurred, please try again.\nReason: " + error + "\nStatus: " + status);
		},
		success: function (data, status, jqXHR)
		{
			$("#main").html(data);
			$.getScript("pages/" + page + ".js");
		}
	});
}