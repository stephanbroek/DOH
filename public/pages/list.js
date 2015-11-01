$.each(experiments, function(index, obj)
{
	$("table tbody").append("<tr id=" + obj.id + ">\n<td>" + obj.difc + "</td>\n<td>" + obj.desc + "</td>\n</tr>");
});
$("table tbody tr").click(function(event) {currentExperiment = event.currentTarget.id; getPage("exp");});