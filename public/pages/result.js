$("#q-follow").html("Did you follow the rule of " + experiments[activeExperiment].desc.toLowerCase() + " last night?");
$("#result button").click(function(event) {getPage("hist"); $("#head").html("<span class=\"glyphicon glyphicon-bed\" aria-hidden=\"true\"></span> Results submitted ");})