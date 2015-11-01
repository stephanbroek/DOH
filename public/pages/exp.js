if(experiments[currentExperiment].difc == "L")
{
	$("#title").html("Lesson #" +experiments[currentExperiment].num);
	$("button").remove();
}
$("#desc").html(experiments[currentExperiment].desc);
$("#expl").html(experiments[currentExperiment].expl);
$("#experiment button").click(function(event) {activeExperiment = currentExperiment; getPage("hist"); $("#head").html("<span class=\"glyphicon glyphicon-bed\" aria-hidden=\"true\"></span> Experiment Started: " + experiments[activeExperiment].desc);})
