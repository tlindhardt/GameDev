/*jslint browser: true, white: true, plusplus: true */
/*global MYGAME, console, KeyEvent, requestAnimationFrame, performance */
MYGAME.screens['game-play'] = (function() {
	'use strict';
	
	var mouseCapture = false,
		myMouse = MYGAME.input.Mouse(),
		myKeyboard = MYGAME.input.Keyboard(),
		myAutomatic = MYGAME.input.Auto(),
		myTouch = MYGAME.input.Touch(),
		particle = null,
		Coins = null,
		cancelNextRequest = false;
	
	function initialize() {
		console.log('game initializing...');

		particle = particleSystem( {
				image : MYGAME.images['images/Dollar-Sign.png'],
				center: {x: 300, y: 300},
				speed: {mean: 40, stdev: 10},
				lifetime: {mean: 4, stdev: 1}
			},
			MYGAME.graphics
		);


		myKeyboard.registerSingleCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			$('#countdown').text("");
			$('#overallscore').text("");
			MYGAME.currentLevel = 1;
			MYGAME.storage.add(MYGAME.data.overall, MYGAME.overallScore);
			MYGAME.overallScore = 0;
			// Then, return to the main menu
			MYGAME.game.showScreen('main-menu');
		});
	}
	
	function gameLoop(time) {
		var currentTime = Date.now();
		MYGAME.elapsedTime = currentTime - MYGAME.lastTimeStamp;
		MYGAME.lastTimeStamp = currentTime;

		myKeyboard.update(MYGAME.elapsedTime);
		myMouse.update(MYGAME.elapsedTime);
		myAutomatic.update(MYGAME.elapsedTime);

		if(MYGAME.currentLevel > 0 && MYGAME.currentLevel < 4){
			MYGAME.graphics.clear();
			MYGAME.graphics.printScore();
			Coins.draw();
			Coins.update();
			if(Coins.checkEmpty()){
				if(MYGAME.currentLevel === 1)
					MYGAME.storage.add(MYGAME.data.level1, MYGAME.currentScore);
				else if(MYGAME.currentLevel === 2)
					MYGAME.storage.add(MYGAME.data.level2, MYGAME.currentScore);
				else if(MYGAME.currentLevel === 3)
					MYGAME.storage.add(MYGAME.data.level3, MYGAME.currentScore);

				if(MYGAME.currentScore >= 100){
					cancelNextRequest = true;
					MYGAME.graphics.clear();
					MYGAME.currentLevel++;
					run();
				}
				else{
					$('#countdown').text("LOSE!");
					$('#countdown').show();
				}
			}
		}
		if (!cancelNextRequest) {
			requestAnimationFrame(gameLoop);
		}
	}
	
	function timer(){
		var myVar=setInterval(function(){
			if(MYGAME.timeout > 0)
				$('#countdown').text(MYGAME.timeout);
			else
				$('#countdown').text("START");
			MYGAME.timeout--;
			if(MYGAME.timeout < -1){
				$('#countdown').hide();
				clearInterval(myVar);
				subRun();
			}
		},1000);
	}

	function run() {
		if(MYGAME.currentLevel > 3){
			$('#countdown').text("WIN!");
			$('#countdown').show();
			subRun();
		}
		else{
			$('#countdown').text("");
			$('#countdown').show();
			MYGAME.timeout = 3;
			timer();
		}
	}

	function subRun(){
		MYGAME.lastTimeStamp = Date.now();
		//
		// Start the animation loop
		cancelNextRequest = false;

		if(MYGAME.currentLevel === 1){
			Coins = MYGAME.Coin(10,3,5,1,100,myAutomatic);
			start();
		}
		else if(MYGAME.currentLevel === 2){
			Coins = MYGAME.Coin(15,4,10,1,150,myAutomatic);
			start();
		}
		else if(MYGAME.currentLevel === 3){
			Coins = MYGAME.Coin(20,5,12,1,200,myAutomatic);
			start();
		}
		else{
			start();
		}
	}

	function start(){
		MYGAME.currentScore = 0;

		if(myMouse.handlersDown.length === 0){
			MYGAME.overallScore = 0;
			myMouse.registerCommand('mousedown', function(e){
				Coins.checkBounds(e);
			});
			myTouch.registerCommand('touchstart', function(e){
				Coins.checkBounds(e.targetTouches[0]);
			});

		}

		requestAnimationFrame(gameLoop);
	}
	
	return {
		initialize : initialize,
		run : run
	};
}());
