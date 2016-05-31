var intervalID;
var timer;

var Timer = function(){
	this.getMin = function(){
		return parseInt($("#timer-min").html())
	}
	this.getSec = function(){
		return parseInt($("#timer-sec").html())
	}
	this.setTime = function(min, sec){
		$("#timer-min").html(min);
		$("#timer-min").animate({
			top: '-40px'
		});
		$("#timer-sec").html(sec);
	}
}

var TimeBox = function(){
	var timeDisplay = new Timer();
	var self = this;
	this.minutes = timeDisplay.getMin();
	this.seconds = timeDisplay.getSec();

	this.decrementTime = function(){
			if (self.seconds == 0){
					self.seconds = 59;
					self.minutes = self.minutes - 1;
				}
				else {
					self.seconds = self.seconds - 1;
				};
			
		}

	this.updateDisplay = function(){
		if (self.minutes<10){
			displayMin = "0" + self.minutes;
		} else {
			displayMin = self.minutes;
		}
		if (self.seconds<10){
			displaySec = "0"+self.seconds;
		} else {
			displaySec = self.seconds;
		}
		timeDisplay.setTime(displayMin, displaySec);
	}

	this.runTimer = function (){
		if (self.checkTimeDone() == false) {
			self.decrementTime();
			self.updateDisplay();
		} else {
			console.log("timer done")
			clearInterval(intervalID);
		}
	}

	this.checkTimeDone = function (){
			if (self.minutes == 0 && self.seconds == 0){
				return true;
			} else {
				return false;
			}
		}
}

$(document).ready(function(){

	$("#start-button").on("click", function(){
		$(this).toggle();
		$("#pause-button").toggle();
		timer = new TimeBox();
		intervalID = setInterval(timer.runTimer, 1000);
	});

	$("#pause-button").on("click", function(){
		$(this).toggle();
		$("#resume-button").toggle();
		clearInterval(intervalID);
	});

	$("#resume-button").on("click", function(){
		$(this).toggle();
		$("#pause-button").toggle();
		intervalID = setInterval(timer.runTimer, 1000);
	});

});