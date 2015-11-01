if(experiments[currentExperiment].difc == "L")
{
	$("#title").html("Lesson #" +experiments[currentExperiment].num);
	$("button").remove();
}
$("#desc").html(experiments[currentExperiment].desc);
$("#expl").html(experiments[currentExperiment].expl);
$("button").click(function(event) {activeExperiment = currentExperiment; getPage("hist")})
