function decrementTime(){
	while (totalSec > 0){
		if (seconds == 0){
			seconds = 59;
			minutes = minutes - 1;
			console.log("minutes: " + minutes)
		}
		else {
			seconds = seconds - 1;
			console.log("seconds: " + seconds)
			};
		$("#timer-min").html(minutes);
		$("#timer-sec").html(seconds);
	}
		clearInterval(timerFunction);

	}
function startTimer(){
	timerFunction = setInterval(decrementTime, 1000);
}

$(document).ready(function(){
	var minutes = parseInt($("#timer-min").html());
	var seconds = 0;
	var totalSec = minutes * 60;


$("#start-button").on("click", function(){

	startTimer();
	

});

});