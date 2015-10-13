//Global
var norepeat = false;
$(function() {
	loadPortfolio();
	navigation();
	scores();
	window.onscroll = function(){
		if (scores.timeout) {
			clearTimeout(scores.timeout);
		}
		scores.timeout = setTimeout(scores, 100);
	}
});


function fillPortfolio(data) {
	var counter = 0;

	while (counter < data.length) {
		$('.inner-gallery').append('<div class="row" data-row="'+(counter + 1)+'"></div>');

		for (var i = 0; i < data[counter].length; i++) {
			$('.inner-gallery .row[data-row="'+(counter + 1)+'"]').append('<div class="column">' +
																			'<div class="inner">' +
																			'<a href="'+data[counter][i].url+'" target="_blank">' +
																			'<img src="'+data[counter][i].image+'"></img><p>'+data[counter][i].title+'</p></a></div></div>');
		};
		counter++;
	}
}

function listToMatrix(list, elementsPerSubArray) {
	var matrix = [], i, k;
	for (i = 0, k = -1; i < list.length; i++) {
		if (i % elementsPerSubArray === 0) {
	    	k++;
	        matrix[k] = [];
	    }
		matrix[k].push(list[i]);
	}
	return matrix;
}

function loadPortfolio() {
	$.ajax({
		method: "GET",
		url: "static/data/portfolio.json",
		dataType: "json",
		success: function (data) {
			var dataMatrix = listToMatrix(data, 4);
			fillPortfolio(dataMatrix);
		}
	});
}

function navigation() {
	$('.navigation ul li').click(function(){
		var link = this.getAttribute("class");
		var positionContainer = document.getElementById(link).offsetTop - 10;
		$('html, body').animate({scrollTop: positionContainer}, 500);
	});
}

function scores() {
	var skillsWaypoint = $("#nav-skills").offset().top - 400;
	if ($(window).scrollTop() >= skillsWaypoint && !norepeat) {
		norepeat = true;
		var collection = $(".prec");

		var loopIt = function(item) {
			var i = 0, prec, t;
			var element = $(collection[item]);
			var activeBorder = $('[data-border='+(item+1)+']');
			var degs = element.attr("class").split(' ')[1];
				
			var fillCircle = function() {
				i++;
				if (i < 0)
					i = 0;
				if (i > degs)
					i = parseInt(degs);
				
				prec = (100*i)/360;   
				element.html(Math.round(prec)+"%");
				    
				if (i <= 120) {
					activeBorder.css('background-image','linear-gradient(' + (90 + i) + 'deg, transparent 50%, #FFFFFF 50%),linear-gradient(90deg, #FFFFFF 50%, transparent 50%)');
					activeBorder.css('background-color','#D72727');
				}
				else if (i <= 180) {
					activeBorder.css('background-image','linear-gradient(' + (90 + i) + 'deg, transparent 50%, #FFFFFF 50%),linear-gradient(90deg, #FFFFFF 50%, transparent 50%)');
					activeBorder.css('background-color','#FBFB0E');
				}
				else {
					activeBorder.css('background-image','linear-gradient(' + (i - 90) + 'deg, transparent 50%, #36D533 50%),linear-gradient(90deg, #FFFFFF 50%, transparent 50%)');
					activeBorder.css('background-color','#36D533');
				}
					    
				t = setTimeout(function() {
					if (i != degs) 
				    	fillCircle();
				    else 
				    	clearInterval(t);
				}, 1);
			};
			fillCircle();
		};

		for (var k = 0;  k < collection.length; k++) {
			loopIt(k);
		};
	}
}