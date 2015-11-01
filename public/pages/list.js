$.each(experiments, function(index, obj)
{
	$("table tbody").append("<tr>\n<td>" + obj.difc + "</td>\n<td>" + obj.desc + "</td>\n</tr>").click(function() {currentExperiment = obj.id; getPage("exp");});
});