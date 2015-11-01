$(function() {
	getPage("home");
});

function getPage(page)
{
	$.ajax({
		url: "pages/" + page + ".json",
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
			$("#main").html(data.html);
			if(data.script != undefined)
			{
				$.getScript("pages/" + page + ".js");
			}
		}
	});
}