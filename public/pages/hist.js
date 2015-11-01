$.each(hist, function(index, obj) {
	$("#hist > tbody").append("<tr id=" + obj.id + ">\n<td>" + experiments[obj.id].difc + "</td>\n<td>" + experiments[obj.id].desc + "</td>\n<td>" + obj.res + "</td>\n</tr>");
});
$("#hist > tbody tr").click(function(event) {currentExperiment = event.currentTarget.id; getPage("exp");});

if(activeExperiment != undefined)
{
	$("#current").html("Current:");
	$("#curr > tbody").append("<tr id=" + activeExperiment + ">\n<td>" + experiments[activeExperiment].difc + "</td>\n<td>" + experiments[activeExperiment].desc + "</td>\n</tr>");
	$("#current-tbl").attr("style","");
}