$(function() {
	$.ajax({
		url: "api/test",
		accepts: "application/json; charset=utf-8",
		async: true,
		cache: false,
		contentType: "application/json; charset=utf-8",
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
			$("body").html(data.body)
		}
	});
	$("body").html("test");
});