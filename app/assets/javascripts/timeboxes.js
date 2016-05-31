var Timer = function(){
	this.getTime = function(){
		return $("#timer-div")
	}
}

var TimeBox = function(min){
	console.log("new Timebox")
	var timer = new Timer();
	var self = this;
	this.minutes = min;
	this.seconds = 0;

	this.decrementTime = function(){
			console.log("time decrementing")
			console.log(self.minutes);
			console.log(self.seconds);
			if (self.seconds == 0){
					self.seconds = 59;
					self.minutes = self.minutes - 1;
					console.log("minutes: " + self.minutes)
				}
				else {
					self.seconds = self.seconds - 1;
					console.log("seconds: " + self.seconds)
				};
			
		}

	this.updateDisplay = function (){
		$("#timer-min").html(self.minutes);
		if (self.seconds<10){
			$("#timer-sec").html("0"+self.seconds)
		} else {
			$("#timer-sec").html(self.seconds);
		}
	}

	this.runTimer = function (){
			console.log("one second passes")
			self.updateDisplay();
			self.decrementTime();
	}

	this.checkTimeDone = function (){
			if (self.minutes === 0 && self.seconds === 0){
				return true;
			} else {
				return false;
			}
		}
}

$(document).ready(function(){
	var min = parseInt($("#timer-min").html());
	var totalSec = min * 60;


	$("#start-button").on("click", function(){
		console.log("clicked new")
		var intervalID;
		timer = new TimeBox(min);
		console.log(timer);
		// intervalID = 
		setInterval(timer.runTimer, 1000);
		// if(timer.checkTimeDone() == true){
		// 	clearInterval(intervalID);
		// };
		
	});

});