/*jslint browser: true, white: true, plusplus: true */
/*global MYGAME */
// ------------------------------------------------------------------
// 
// This is the game object.  Everything about the game is located in 
// this object.
//
// ------------------------------------------------------------------

MYGAME.game = (function() {
	'use strict';
	
	function showScreen(id) {
		var screen = 0,
			screens = null;
		//
		// Remove the active state from all screens.  There should only be one...
		screens = document.getElementsByClassName('active');
		for (screen = 0; screen < screens.length; screen ++) {
			screens[screen].classList.remove('active');
		}
		//
		// Tell the screen to start actively running
		MYGAME.screens[id].run();
		//
		// Then, set the new screen to be active
		document.getElementById(id).classList.add('active');
	}

	//------------------------------------------------------------------
	//
	// This function performs the one-time game initialization.
	//
	//------------------------------------------------------------------
	function initialize() {
		var screen = null;
		MYGAME.currentLevel = 1;
		//
		// Go through each of the screens and tell them to initialize
		for (screen in MYGAME.screens) {
			if (MYGAME.screens.hasOwnProperty(screen)) {
				MYGAME.screens[screen].initialize();
			}
		}
		
		//
		// Make the main-menu screen the active one
		showScreen('main-menu');
	}
	
	return {
		initialize : initialize,
		showScreen : showScreen
	};
}());
