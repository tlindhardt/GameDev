/*jslint browser: true, white: true, plusplus: true */
/*global MYGAME, console, KeyEvent, requestAnimationFrame, performance */
MYGAME.screens['game-play'] = (function() {
	'use strict';
	
	var myKeyboard = MYGAME.input.Keyboard(),
		myAutomatic = MYGAME.input.Auto(),
		Images = [],
		gameover = false,
		gameovertimeout = 0,
		cancelNextRequest = false,
		scoreValue = 100,
		Sounds = [],
		soundItr = 0,
		Particles = [];
	
	function initialize() {
		console.log('game initializing...');
	}

	function resetGame(){
		$('#countdown').hide();
		MYGAME.overallScore = 0;
		MYGAME.level = 1;

		myKeyboard = MYGAME.input.Keyboard();
		myAutomatic = MYGAME.input.Auto();
		Images = [];
		gameover = false;
		gameovertimeout = 0;
		cancelNextRequest = false;
		scoreValue = 100;
		Particles = [];

		for(var i = 0; i < 10; ++i){
			Sounds.push(new Audio("sounds/sound.mp3"));
		}
		soundItr = 0;
	}

	function playSound(){
		if(soundItr >= 10)
			soundItr = 0;
		Sounds[soundItr++].play();
	}

	function setupGame(){
		resetGame();
		//register for the space pressed
		myKeyboard.registerSingleCommand(KeyEvent.DOM_VK_SPACE, spacePressed);

		//add textures... only need 4
		Images.push(MYGAME.graphics.Texture({
			image : MYGAME.images['images/border.png'],
			type : "meter",
			center : { x : $(window).width()/2, y : $(window).height()/2 },
			width : 500+10, height : 50+10,
			rotation : 0,
			moveRate : 10,			// pixels per second
			rotateRate : 3.14159,
			particle : false
		}));

		Images.push(MYGAME.graphics.Texture({
			image : MYGAME.images['images/meter.png'],
			type : "meter",
			center : { x : $(window).width()/2, y : $(window).height()/2 },
			width : 500, height : 50,
			rotation : 0,
			moveRate : 10,			// pixels per second
			rotateRate : 3.14159,
			particle : false
		}));

		Images.push(MYGAME.graphics.Texture({
			image : MYGAME.images['images/border.png'],
			type : "meter",
			center : { x : $(window).width()/2, y : $(window).height()/2 },
			width : 300, height : 50,
			rotation : 0,
			moveRate : 10,			// pixels per second
			rotateRate : 3.14159,
			particle : false
		}));

		Images.push(MYGAME.graphics.Texture({
			image : MYGAME.images['images/shaded.png'],
			type : "meter",
			center : { x : $(window).width()/2, y : $(window).height()/2 },
			width : 300-10, height : 50,
			rotation : 0,
			moveRate : 10,			// pixels per second
			rotateRate : 3.14159,
			particle : false
		}));

		Images.push(MYGAME.graphics.Texture({
			image : MYGAME.images['images/border.png'],
			type : "needle",
			center : { x : $(window).width()/2-250, y : $(window).height()/2 },
			width : 10, height : 60,
			rotation : 0,
			moveRate : 500,			// pixels per second
			rotateRate : 3.14159,
			particle : false
		}));

		Images.push(MYGAME.graphics.Texture({
			image : MYGAME.images['images/needle.png'],
			type : "needle",
			center : { x : $(window).width()/2-250, y : $(window).height()/2 },
			width : 6-2, height : 50,
			rotation : 0,
			moveRate : 500,			// pixels per second
			rotateRate : 3.14159,
			particle : false
		}));

		//now add the needle movement
		myAutomatic.registerAutomaticMove(Images[4].needleMove);
		myAutomatic.registerAutomaticMove(Images[5].needleMove);
	}

	function cleanupParticles(){
		for(var i = 0; i < Particles.length; ++i){
			if(Particles[i].remove){
				Particles.splice(i,1);
				i--;
			}
		}
	}

	function addParticle(spec){
		Particles.push(particleSystem( {
				image : MYGAME.images['images/explosion.png'],
				center: {x: spec.x, y: spec.y},
				size: {mean:20, stdev:5},
				speed: {mean: 30, stdev: 1},
				lifetime: {mean: 0.6, stdev: 0.1}
			},
			MYGAME.graphics
		));
	}

	function drawParticles(){
		for(var i = 0; i < Particles.length; ++i){
			Particles[i].update(MYGAME.elapsedTime);
			Particles[i].render();
			Particles[i].create();
		}
	}
	//space pressed function
	function spacePressed(time){
		//first lets check if we are in the shaded region
		var needle = Images[5];
		var shaded = Images[2];
		var shaded1 = Images[3];
		if(needle.getCenter().x > shaded.getCenter().x - shaded.getWidth()/2 && needle.getCenter().x < shaded.getCenter().x + shaded.getWidth()/2){
			MYGAME.overallScore += (MYGAME.level/6 + 1) * scoreValue;
			MYGAME.level += 1;
			if(MYGAME.level > 6)
				MYGAME.level = 6;
			if(MYGAME.level < 6){
				Images[2].setWidth(shaded.getWidth()-60);
				Images[3].setWidth(shaded1.getWidth()-60);
			}
			addParticle(needle.getCenter());
			playSound();
		}
		else{
			gameovertimeout = 0;
			gameover = true;
		}
	}
	
	function gameLoop(time) {
		var currentTime = Date.now();
		MYGAME.elapsedTime = currentTime - MYGAME.lastTimeStamp;
		MYGAME.lastTimeStamp = currentTime;
		MYGAME.graphics.clearScore();
		MYGAME.graphics.clear();

		if(!gameover){
			myKeyboard.update(MYGAME.elapsedTime);
			myAutomatic.update(MYGAME.elapsedTime);

			MYGAME.graphics.printScore();
			for(var i = 0; i < Images.length; ++i){
				Images[i].draw();
			}
			drawParticles();
			cleanupParticles();
		}
		else{
			gameovertimeout += MYGAME.elapsedTime;
			MYGAME.graphics.printGameOver();
			if(gameovertimeout > 1000){
				cancelNextRequest = true;
				MYGAME.storage.add(MYGAME.data.overall, MYGAME.overallScore);
				resetGame();
				MYGAME.game.showScreen('main-menu');
			}
		}
		if (!cancelNextRequest) {
			requestAnimationFrame(gameLoop);
		}
	}

	function run() {
		setupGame();
		start();
	}

	function start(){
		requestAnimationFrame(gameLoop);
	}
	
	return {
		initialize : initialize,
		run : run
	};
}());
