/*jslint browser: true, white: true */
/*global CanvasRenderingContext2D, MYGAME */
// ------------------------------------------------------------------
//
//
// ------------------------------------------------------------------

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
		$('#overallscore').text(MYGAME.overallScore);
	}
	
	function clear() {
		context.clear();
	}
	
	function Texture(spec) {
		var that = {};

		that.type = spec.type;

		that.clicked = false;

		that.remove = false;
		
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
			if((spec.center.y-spec.height/2) < $(window).height() && that.clicked === false){
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
			}
			else if(that.clicked === true){
				if(spec.particle === false){
					spec.particle = particleSystem( {
							image : MYGAME.images['images/Dollar-Sign.png'],
							center: {x: spec.center.x, y: spec.center.y},
							speed: {mean: 50, stdev: 25},
							lifetime: {mean: 2, stdev: .5}
						},
						MYGAME.graphics
					);
				}
				else{
					spec.particle.update(MYGAME.elapsedTime);
					spec.particle.render();
					spec.particle.create();
					if(spec.particle.remove)
						that.remove = true;

				}
			}
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
		drawImage : drawImage
	};
}());
