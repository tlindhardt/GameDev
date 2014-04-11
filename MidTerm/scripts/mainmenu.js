/*jslint browser: true, white: true, plusplus: true */
/*global MYGAME */
MYGAME.screens['main-menu'] = (function() {
	'use strict';
	var myKeyboard = MYGAME.input.Keyboard();
	
	function enterKeyPress(event){
		if(event.keyCode === KeyEvent.DOM_VK_RETURN){
			window.removeEventListener('keypress', enterKeyPress);
			MYGAME.game.showScreen('game-play');
		}
	}
	
	function initialize() {
		//
		// Setup each of menu events for the screens
		document.getElementById('id-new-game').addEventListener(
			'click',
			function() { 
				window.removeEventListener('keypress', enterKeyPress);
				MYGAME.game.showScreen('game-play'); 
			},
			false);
		
		document.getElementById('id-high-scores').addEventListener(
			'click',
			function() { MYGAME.game.showScreen('high-scores'); },
			false);
		
		document.getElementById('id-about').addEventListener(
			'click',
			function() { MYGAME.game.showScreen('about'); },
			false);
	}
	
	function run() {
		window.addEventListener("keypress", enterKeyPress);
	}
	
	return {
		initialize : initialize,
		run : run
	};
}());
