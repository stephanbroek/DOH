$(function() {
	$("#nav-home").click(function() {getPage("home")})
	getPage("home");
});

function getPage(page)
{
	scripArray = ["gantt"];

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
			if(scripArray.indexOf(page) != -1)
			{
				console.log("ping");
				$.getScript("pages/" + page + ".js");
			}
		}
	});
}