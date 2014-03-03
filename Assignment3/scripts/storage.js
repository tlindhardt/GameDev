MYGAME.storage = (function () {
	'use strict';
	
	function add(array, value) {
		if(array.length < 3){
			array.push(value);
		}
		else{
			var i = 0;
			for(i; i < array.length; ++i){
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
		localStorage['level1'] = JSON.stringify(MYGAME.data.level1);
		localStorage['level2'] = JSON.stringify(MYGAME.data.level2);
		localStorage['level3'] = JSON.stringify(MYGAME.data.level3);
		localStorage['overall'] = JSON.stringify(MYGAME.data.overall);
		report();
	}
	function remove(key) {
		localStorage.removeItem(key);
	}

	function report(div) {
		var i;
		var string = "";
		for(i = 0; i < MYGAME.data.level1.length; ++i){
			string += "<div>" + (i+1) + ": " + MYGAME.data.level1[i] + "</div>";
		}
		$('#level-1').html(string);
		string = "";


		for(i = 0; i < MYGAME.data.level2.length; ++i){
			string += "<div>" + (i+1) + ": " + MYGAME.data.level2[i] + "</div>";
		}
		$('#level-2').html(string);
		string = "";


		for(i = 0; i < MYGAME.data.level3.length; ++i){
			string += "<div>" + (i+1) + ": " + MYGAME.data.level3[i] + "</div>";
		}
		$('#level-3').html(string);
		string = "";

		for(i = 0; i < MYGAME.data.overall.length; ++i){
			string += "<div>" + (i+1) + ": " + MYGAME.data.overall[i] + "</div>";
		}
		$('#overall').html(string);
	}

	function init(){
		var i;
		//retrieve the data or setup for the first time
		if(typeof localStorage['level1'] === 'undefined')
			MYGAME.data.level1 = [];
		else
			MYGAME.data.level1 = JSON.parse(localStorage['level1']);

		if(typeof localStorage['level2'] === 'undefined')
			MYGAME.data.level2 = [];
		else
			MYGAME.data.level2 = JSON.parse(localStorage['level2']);

		if(typeof localStorage['level3'] === 'undefined')
			MYGAME.data.level3 = [];
		else
			MYGAME.data.level3 = JSON.parse(localStorage['level3']);

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