/*jslint browser: true, white: true */
/*global CanvasRenderingContext2D, MYGAME */
// ------------------------------------------------------------------
//
//
// ------------------------------------------------------------------

var temp = 0;

MYGAME.graphics = (function() {
	'use strict';
	
	var canvas = document.getElementById('canvas-main'),
		context = canvas.getContext('2d');

	
	//
	// Place a 'clear' function on the Canvas prototype, this makes it a part
	// of the canvas, rather than making a function that calls and does it.
	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};

	function printScore(){
		var score = 'Score: ' + Math.floor(MYGAME.overallScore);
		var level = 'Level: ' + MYGAME.level;
		$('#overallscore').text(score);
		$('#overalllevel').text(level);
	}

	function clearScore(){
		$('#overallscore').text('');
		$('#overalllevel').text('');
	}


	function printGameOver(){
		$('#countdown').show();
	}
	
	function clear() {
		context.clear();
	}
	
	function Texture(spec) {
		var that = {};

		var moveNeedleRight = true,
			currentInterval = 0;

		that.type = spec.type;

		that.clicked = false;

		that.remove = false;

		that.getCenter = function(){
			return spec.center;
		};
		
		that.setWidth = function(width){
			spec.width = width;
		};

		that.getWidth = function(){
			return spec.width;
		};

		that.rotateRight = function(elapsedTime) {
			spec.rotation += spec.rotateRate * (elapsedTime / 1000);
		};
		
		that.rotateLeft = function(elapsedTime) {
			spec.rotation -= spec.rotateRate * (elapsedTime / 1000);
		};
		
		that.moveLeft = function(elapsedTime) {
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveRight = function(elapsedTime) {
			spec.center.x += spec.moveRate * (elapsedTime / 1000);
		};
		
		that.needleMove = function(elapsedTime) {
			if(isNaN(elapsedTime))
				return;
			if(moveNeedleRight === true){
				that.moveRight(elapsedTime);
				if(spec.center.x > $(window).width()/2 + 240)
					moveNeedleRight = false;
			}
			else{
				that.moveLeft(elapsedTime);
				if(spec.center.x < $(window).width()/2 - 240)
					moveNeedleRight = true;
			}
		};

		that.moveUp = function(elapsedTime) {
			spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveDown = function(elapsedTime) {
			spec.center.y += spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveTo = function(center) {
			spec.center = center;
		};

		that.center = spec.center;

		that.width = spec.width;

		that.height = spec.height;
		
		that.draw = function() {
			context.save();
			
			context.translate(spec.center.x, spec.center.y);
			context.rotate(spec.rotation);
			context.translate(-spec.center.x, -spec.center.y);
			context.drawImage(
				spec.image,
				spec.center.x - spec.width/2,
				spec.center.y - spec.height/2,
				spec.width, spec.height);
			
			context.restore();
		};
		
		return that;
	}

	function drawImage(spec) {
		context.save();
		
		context.translate(spec.center.x, spec.center.y);
		context.rotate(spec.rotation);
		context.translate(-spec.center.x, -spec.center.y);
		
		context.drawImage(
			spec.image,
			spec.center.x - spec.size/2,
			spec.center.y - spec.size/2,
			spec.size, spec.size);
		
		context.restore();
	}
	


	return {
		clear : clear,
		Texture : Texture,
		printScore : printScore,
		clearScore : clearScore,
		drawImage : drawImage,
		printGameOver : printGameOver
	};
}());
