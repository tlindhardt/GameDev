var MYGAME = {
	images : {},
	screens : {},
	data : {},

	status : {
		preloadRequest : 0,
		preloadComplete : 0
	}
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
	console.log('Loading resources...');
	Modernizr.load([
		{
			load : [
			    'preload!scripts/jquery.min.js',
			    'preload!scripts/bootstrap.min.js',
			    'preload!scripts/random.js',
				'preload!scripts/renderer.js',
				'preload!scripts/input.js',
				'preload!scripts/game.js',
				'preload!scripts/mainmenu.js',
				'preload!scripts/gameplay.js',
				'preload!scripts/highscores.js',
				'preload!scripts/help.js',
				'preload!scripts/about.js',
			    'preload!scripts/particle-system.js',
			    'preload!scripts/coin.js',
			    'preload!scripts/storage.js',
				'preload!images/Background.png',
				'preload!images/Clock.png',
				'preload!images/Coin-Canadian-Dollar.png',
				'preload!images/Coin-Roman.png',
				'preload!images/Coin-US-Dollary.png',
				'preload!images/Dollar-Sign.png',
				'preload!images/Piggy-Bank.png'
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);

//
// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	MYGAME.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			MYGAME.images[resource.url] = image;
		}
		MYGAME.status.preloadComplete += 1;
		
		//
		// When everything has finished preloading, go ahead and start the game
		if (MYGAME.status.preloadComplete === MYGAME.status.preloadRequest) {
			console.log('Preloading complete!');
			MYGAME.storage.init();
			MYGAME.game.initialize();
			var c=document.getElementById("canvas-main");
			c.width = window.innerWidth-5;
			c.height = window.innerHeight-5;
		}
	};
	
	return resource;
});
