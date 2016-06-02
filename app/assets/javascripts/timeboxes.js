//these two variables are instantiated globally so they can be accessed anywhere.
//workInterval will be the name of the timer function and timer will be the instance of the TimeBox controller we create.

var timerInterval;
var timer;
var timeDisplay;
var workTime;
var breakTime;

//Timer is our view function, and serves to both set and retrieve the current time from the DOM.

var Timer = function(){
	this.getMin = function(){
		return parseInt($("#timer-min").html())
	}
	this.getSec = function(){
		return parseInt($("#timer-sec").html())
	}
	this.setTime = function(min, sec){
		$("#timer-sec").css("top","-10px");
		$("#timer-sec").animate({top: '75px'});
		$("#timer-min").html(min);
		$("#timer-sec").html(sec);
	}
	this.swapClocks = function(){
		$("#timer-container").toggle();
		$("#breaker-container").toggle();
	}
}

//TimeBox is the controller function, handling manipulating the time
//Initializing it creates a new instance of the view, Timer (better names pending), which grabs the data from the rendered page.

var TimeBox = function(){
	timeDisplay = new Timer();
	var self = this;
	this.minutes = timeDisplay.getMin();
	this.seconds = timeDisplay.getSec();
	var totalMin = this.minutes
	var totalSec = this.Seconds
	this.cycles = 0;

//this function does what its called- it decrements the value of each second, and each minute once the second value
//reaches 0, at which point it resets the seconds to 59.

	this.decrementTime = function(){
			if (self.seconds == 0){
					self.seconds = 59;
					self.minutes = self.minutes - 1;
				}
				else {
					self.seconds = self.seconds - 1;
				};
			
		}

//updateDisplay makes calls to the view, supplying the new values of the time.

	this.updateDisplay = function(){
		if (self.minutes<10){
			displayMin = "0" + self.minutes;
		} else {
			displayMin = self.minutes;
		}
		if (self.Seconds<10){
			displaySec = "0"+self.Seconds;
		} else {
			displaySec = self.Seconds;
		}
		timeDisplay.setTime(displayMin, displaySec);
	}

//checkTimeDone checks to see if we've reached 0 minutes and 0 Seconds, and returns true if so.
	this.checkTimeDone = function (){
			if (self.minutes == 0 && self.Seconds == 0){
				return true;
			} else {
				return false;
			}
		}

//runTimer is the big boss of all the other functions, calling them in order, pending approval from the 
//checkTimeDone function. Will be adding more logic here to switch to the break-timer when the -timer reaches 0.
	this.runTimer = function (){
		if (self.checkTimeDone() == false) {
			self.decrementTime();
			self.updateDisplay();
		} else {
			console.log("timer done")
			clearInterval(Interval);
			timeDisplay.swapClocks();
			$("#timer-min").html(totalMin)
			breakInterval = setInterval(timer.runBreaker, 1000)
		}
	}


}

$(document).ready(function(){
	var url = "/timeboxes/" + $("#timebox-id").html() + "/info";

	$.ajax({
		type: "GET",
		url: url
	})
	.done(function(timeboxData){
		workTime = timeboxData.work_block_time;
		breakTime = timeboxData.break_block_time;
		activity = timeboxData.activity;
		$("#start-button").toggle();
		if(workTime<10){
			$("#timer-min").html("0" + workTime);
		} else
		{
			$("#timer-min").html(workTime);
		}
		$("#timer-colon").html(":")
		$("#timer-sec").html("00");
	});

//when the start button is clicked, it hides and we set the interval method into motion, calling runTimer every second
//on the TimeBox instance we have just created. Also, a pause button appears to replace the start button.

	$("#start-button").on("click", function(){
		$(this).toggle();
		$("#pause-button").toggle();
		$("#start-message").toggle();
		timer = new TimeBox();
		Interval = setInterval(timer.runTimer, 1000);
	});

//when the pause button is clicked, the timer is stopped and a resume button replaces the pause button.

	$("#pause-button").on("click", function(){
		$(this).toggle();
		$("#resume-button").toggle();
		$("#pause-message").toggle();
		$("#start-message").toggle();
		clearInterval(timerInterval);
	});

//when the resume button is clicked, the resume button is replaced by the pause button and the timer starts up again.

	$("#resume-button").on("click", function(){
		$(this).toggle();
		$("#pause-button").toggle();
		$("#pause-message").toggle();
		$("#start-message").toggle();
		timerInterval = setInterval(timer.runTimer, 1000);
	});

});