MYGAME.Coin = function(usCoin, romanCoin, canadianCoin, clocks, speed, myAutomatic){
	var that = {};
	var i = 0;
	var coinArray = makeCoins(usCoin, romanCoin, canadianCoin, clocks, speed, myAutomatic);

	function makeCoins(usCoin, romanCoin, canadianCoin, clocks, speed, myAutomatic){
		var coins = [];
		for(i = 0; i < usCoin; ++i){
			coins.push( MYGAME.graphics.Texture( {
						image : MYGAME.images['images/Coin-US-Dollary.png'],
						type : "us",
						center : { x : Random.nextRange(50,$(window).width() - 50 - 200), y : Random.nextRange(-1000,0) },
						width : 50, height : 50,
						rotation : 0,
						moveRate : Random.nextGaussian(speed,10),			// pixels per second
						rotateRate : 3.14159,
						particle : false
					}));
		}
		for(i = 0; i < romanCoin; ++i){
			coins.push( MYGAME.graphics.Texture( {
						image : MYGAME.images['images/Coin-Roman.png'],
						type : "roman",
						center : { x : Random.nextRange(30,$(window).width() - 30 - 200), y : Random.nextRange(-1000,0) },
						width : 30, height : 30,
						rotation : 0,
						moveRate : Random.nextGaussian(speed,10),			// pixels per second
						rotateRate : 3.14159,
						particle : false
					}));
		}
		for(i = 0; i < canadianCoin; ++i){
			coins.push( MYGAME.graphics.Texture( {
						image : MYGAME.images['images/Coin-Canadian-Dollar.png'],
						type : "canadian",
						center : { x : Random.nextRange(100,$(window).width() - 100 - 200), y : Random.nextRange(-1000,0) },
						width : 100, height : 100,
						rotation : 0,
						moveRate : Random.nextGaussian(speed,10),			// pixels per second
						rotateRate : 3.14159,
						particle : false
					}));
		}
		for(i = 0; i < clocks; ++i){
			coins.push( MYGAME.graphics.Texture( {
						image : MYGAME.images['images/Clock.png'],
						type : "clock",
						center : { x : Random.nextRange(50,$(window).width() - 50 - 200), y : Random.nextRange(-1000,0) },
						width : 50, height : 50,
						rotation : 0,
						moveRate : Random.nextGaussian(speed,10),			// pixels per second
						rotateRate : 3.14159,
						particle : false
					}));
		}

		for(i = 0; i < coins.length; ++i){
			myAutomatic.registerAutomaticMove(coins[i].moveDown);
		}
		return coins;
	}

	that.draw = function(){
		for(i = 0; i < coinArray.length; ++i){
			coinArray[i].draw();
		}
	};

	that.addElements = function(usCoin, romanCoin, canadianCoin, clocks, speed, myAutomatic){
		var tempCoins = makeCoins(usCoin, romanCoin, canadianCoin, clocks, speed, myAutomatic);
		for(i = 0; i < tempCoins.length; ++i){
			coinArray.push(tempCoins[i]);
		}
	};

	that.checkEmpty = function(){
		var empty = true;
		for(i = 0; i < coinArray.length; ++i){
			if((coinArray[i].center.y - coinArray[i].width/2) < $(window).height())
				empty = false;
		}
		return empty;
	};

	that.checkBounds = function(e){
		for(i = 0; i < coinArray.length; ++i){
			if(e.pageX <= (coinArray[i].center.x + coinArray[i].width/2) &&
			   e.pageX >= (coinArray[i].center.x - coinArray[i].width/2) &&
			   e.pageY >= (coinArray[i].center.y - coinArray[i].height/2) &&
			   e.pageY <= (coinArray[i].center.y + coinArray[i].height/2))
			{
				if(coinArray[i].clicked !== true){
					coinArray[i].clicked = true;
					if(coinArray[i].type === "us"){
						MYGAME.currentScore += 10;
						MYGAME.overallScore += 10;
					}
					else if(coinArray[i].type === "canadian")
						MYGAME.currentScore = 0;
					else if(coinArray[i].type === "roman"){
						MYGAME.currentScore += 50;
						MYGAME.overallScore += 50;
					}
					else if(coinArray[i].type === "clock"){
						if(MYGAME.currentLevel === 1)
							that.addElements(5,1,1,0,100,myAutomatic);
						else if(MYGAME.currentLevel === 2)
							that.addElements(8,2,3,0,150,myAutomatic);
						else if(MYGAME.currentLevel === 3)
							that.addElements(12,3,4,0,200,myAutomatic);
					}
				}
				break;
			}
		}
	};

	that.update = function(){
		for(i = 0; i < coinArray.length; ++i){
			if(coinArray[i].remove){
				coinArray.splice(i,1);
				break;
			}
		}
	};
	return that;
};