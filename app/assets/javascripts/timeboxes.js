//these two variables are instantiated globally so they can be accessed anywhere.
//intervalID will be the name of the timer function and timer will be the instance of the TimeBox controller we create.

var intervalID;
var timer;

//Timer is our view function, and serves to both set and retrieve the current time from the DOM.

var Timer = function(){
	this.getWorkMin = function(){
		return parseInt($("#timer-min").html())
	}
	this.getWorkSec = function(){
		return parseInt($("#timer-sec").html())
	}
	this.setWorkTime = function(min, sec){
		$("#timer-sec").css("top","-100px");
		$("#timer-sec").animate({top: '75px'});
		$("#timer-min").html(min);
		$("#timer-sec").html(sec);
	}
	this.getBreakMin = function(){
		return parseInt($("#breaker-min").html())
	}
	this.getBreakSec = function(){
		return parseInt($("#breaker-sec").html())
	}
	this.setBreakTime = function(min, sec){
		$("#breaker-min").html(min);
		$("#breaker-sec").html(sec);
	}
}

//TimeBox is the controller function, handling manipulating the time
//Initializing it creates a new instance of the view, Timer (better names pending), which grabs the data from the rendered page.

var TimeBox = function(){
	var timeDisplay = new Timer();
	var self = this;
	this.workMinutes = timeDisplay.getWorkMin();
	this.workSeconds = timeDisplay.getWorkSec();
	this.breakMinutes = timeDisplay.getBreakMin();
	this.breakSeconds = timeDisplay.getBreakSec();
	this.cycles = 0;

//this function does what its called- it decrements the value of each second, and each minute once the second value
//reaches 0, at which point it resets the seconds to 59.

	this.decrementTime = function(){
			if (self.workSeconds == 0){
					self.workSeconds = 59;
					self.workMinutes = self.workMinutes - 1;
				}
				else {
					self.workSeconds = self.workSeconds - 1;
				};
			
		}

//updateDisplay makes calls to the view, supplying the new values of the time.

	this.updateDisplay = function(){
		if (self.workMinutes<10){
			displayMin = "0" + self.workMinutes;
		} else {
			displayMin = self.workMinutes;
		}
		if (self.workSeconds<10){
			displaySec = "0"+self.workSeconds;
		} else {
			displaySec = self.workSeconds;
		}
		timeDisplay.setWorkTime(displayMin, displaySec);
	}

//checkTimeDone checks to see if we've reached 0 workMinutes and 0 workSeconds, and returns true if so.
	this.checkTimeDone = function (){
			if (self.workMinutes == 0 && self.workSeconds == 0){
				return true;
			} else {
				return false;
			}
		}

//runTimer is the big boss of all the other functions, calling them in order, pending approval from the 
//checkTimeDone function. Will be adding more logic here to switch to the break-timer when the work-timer reaches 0.
	this.runTimer = function (){
		if (self.checkTimeDone() == false) {
			self.decrementTime();
			self.updateDisplay();
		} else {
			console.log("timer done")
			clearInterval(intervalID);
		}
	}


}

$(document).ready(function(){

//when the start button is clicked, it hides and we set the interval method into motion, calling runTimer every second
//on the TimeBox instance we have just created. Also, a pause button appears to replace the start button.

	$("#start-button").on("click", function(){
		$(this).toggle();
		$("#pause-button").toggle();
		$("#start-message").toggle();
		timer = new TimeBox();
		intervalID = setInterval(timer.runTimer, 1000);
	});

//when the pause button is clicked, the timer is stopped and a resume button replaces the pause button.

	$("#pause-button").on("click", function(){
		$(this).toggle();
		$("#resume-button").toggle();
		$("#pause-message").toggle();
		$("#start-message").toggle();
		clearInterval(intervalID);
	});

//when the resume button is clicked, the resume button is replaced by the pause button and the timer starts up again.

	$("#resume-button").on("click", function(){
		$(this).toggle();
		$("#pause-button").toggle();
		$("#pause-message").toggle();
		$("#start-message").toggle();
		intervalID = setInterval(timer.runTimer, 1000);
	});

});