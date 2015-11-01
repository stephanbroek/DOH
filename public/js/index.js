$(function() {
	$("#nav-home").click(function() {getPage("home")})
	$("#nav-list").click(function() {getPage("list")})
	getPage("home");
});

experiments = [{id: 0, difc: 1, desc: "No Screens", expl: "Don't use a screen for 2 hours before going to bed"},
	{id: 1, difc: 1, desc: "Read Before Bed", expl: "Read a book for an hour before bed"},
	{id: 2, difc: 1, desc: "Earplugs", expl: "Wear earplugs in bed"},
	{id: 3, difc: 1, desc: "Eat almond butter", expl: "Eat some almond butter in the evening"},
	{id: 4, difc: 2, desc: "No alcohol before bed", expl: "Don't drink alcohol 4 hours before bed"},
	{id: 5, difc: 3, desc: "Take morning ice bath", expl: "Take an icebath in the morning to help wake you up"}]

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