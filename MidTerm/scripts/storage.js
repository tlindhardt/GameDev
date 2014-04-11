MYGAME.storage = (function () {
	'use strict';
	
	function add(array, value) {
		if(array.length < 5){
			array.push(value);
		}
		else{
			array.sort(function(a,b){
				return a-b;
			});
			for(var i = 0; i < array.length; ++i){
				if(array[i] < value){
					array[i] = value;
					break;
				}
			}
		}
		array.sort(function(a,b){
			return b-a;
		});
		save();
	}
	
	function save(){
		localStorage['overall'] = JSON.stringify(MYGAME.data.overall);
		report();
	}
	function remove(key) {
		localStorage.removeItem(key);
	}

	function report(div) {
		var i;
		var string = "";
		for(i = 0; i < MYGAME.data.overall.length; ++i){
			string += "<div>" + (i+1) + ": " + Math.floor(MYGAME.data.overall[i]) + "</div>";
		}
		$('#overall').html(string);
	}

	function init(){
		var i;
		if(typeof localStorage['overall'] === 'undefined')
			MYGAME.data.overall = [];
		else
			MYGAME.data.overall = JSON.parse(localStorage['overall']);

		save();
	}

	return {
		add : add,
		remove : remove,
		init : init
	};
}());