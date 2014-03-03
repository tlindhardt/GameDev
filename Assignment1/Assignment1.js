var Game1 = {};

Game1.init = function(){
	Game1.previousTime = Date.now();
	Game1.gameLoop(Game1.previousTime);
};

Game1.gameLoop = function(){
	var time = Date.now();
	var currentTime = time - Game1.previousTime;
	Game1.update(currentTime);
	Game1.render();
	Game1.previousTime = time;
	requestAnimationFrame(Game1.gameLoop);
};

Game1.update = function(time){
	for(var i = 0; i < Game1.timerStack.length; ++i){
		var timer = Game1.timerStack[i];
		if(timer.numberTimes !== 0){
			timer.currentTime += time;
			if(timer.currentTime >= timer.interval){
				timer.needsRender = true;
				timer.currentTime = timer.currentTime - timer.interval;
				timer.numberTimes -= 1;
			}
		}
	}
};

Game1.render = function(){
	for(var i = 0; i < Game1.timerStack.length; ++i){
		var timer = Game1.timerStack[i];
		var msg = 'Timer: ' + timer.name + '( ' + timer.numberTimes + ' remaining ) \n';
		if(timer.numberTimes <= 0){
			$('#textArea').append(msg);
			Game1.timerStack.splice(i,1);
			i--;
		}
		else if(timer.needsRender === true){
			timer.needsRender = false;
			$('#textArea').append(msg);
		}
	}
};

Game1.timerStack = Array();

Game1.timer = function(){
	this.name = 0;
	this.currentTime = 0;
	this.numberTimes = 0;
	this.interval = 0;
	this.needsRender = false;
};

Game1.addTimer = function(){
	if($('#nameInput').val() === '' || $('#intervalInput').val() === '' || $('#numberTimesInput').val() === ''){
		alert('Fill in all fields before submitting!');
	}
	else{
		var newTimer = new Game1.timer();
		newTimer.name = $('#nameInput').val();
		newTimer.numberTimes = $('#numberTimesInput').val();
		newTimer.interval = $('#intervalInput').val();
		$('#numberTimesInput').val('');
		$('#intervalInput').val('');
		$('#nameInput').val('');
		newTimer.currentTime = 0;
		Game1.timerStack.push(newTimer);
	}
};