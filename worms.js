var followingMouse = false, mouseIsDown = false, r = 1, g = 0, b = 0, colorAscending = true;
var height = 0, width = 0, sizeAscending = true, wormDone = false; 
var wormArray = [], singleWormDataArray = [], totalWormDataArray = [];
var wormId = 0, wormNumber = 0, doNotDraw = false, changingColor = false;
var segmentCounter = 0, changingRadius = false, n = 1, wiggling = false;
var wiggleArrayComplete = false, wiggleFactor = 0, wiggleEndPoints = 5;
var wormClicked = null, selectedWorm = "worm0", colorSpeed = 100;
var drawOneWormOnly = false;							//change to draw multiple worms	
var test = 1;
//var checkSpeed = 1;

function clearWorms(){
	while(document.body.lastChild.className === 'newDiv'){
		document.body.removeChild(document.body.lastChild);
	}
	wormId = 0;
	wormNumber = 0;
	segmentCounter = 0;
	height = 0;
	width = 0;
	singleWormDataArray = [];
	totalWormDataArray = [];
	sizeAscending = true;
}

function autoWhiteInject(){
	for (i = 0; i < 199; i++){
		var rand = Math.random();
		if (rand > 0.8){
			var tempSegment = "segment" + i;
			document.getElementById(tempSegment).style.backgroundColor = "white";
		}
	}
}

function checkSpeed(){
	var checkingSpeed = function(){
		clearInterval(checkingSpeed);
		colorSpeedTest = document.getElementById("colorSpeed").value;
		if (typeof colorSpeedTest === "number" && colorSpeedTest >= 0){
			colorSpeed = colorSpeedTest;
		}
		checkingSpeed = setInterval(checkSpeed, colorSpeed);
	}
}
	
window.onload = function(){
	checkSpeed();
}

$(document).ready(function(){

});
$(document).mousedown(function(event){
	//e.originalEvent.preventDefault();
	$('div').click(function(){
		selectedWorm = $(this).attr('tagName');
		//var tempSplit = wormClicked.split("");
		//selectedWorm = totalWormDataArray	
	});
	wormDone = false;
	makeWorm(event);
	mouseIsDown = true;
});
$(document).mouseup(function(){
	mouseIsDown = false;
});
$(document).mousemove(function(event){
	$('#buttonBox').mouseover(function(){
	});		
	if (mouseIsDown){
		makeWorm(event);
	}
});	

function alterWiggle(){
	wiggleEndPoints = document.getElementById("wiggleInput").value;
}

function wiggleNew(){	
}

function wiggle(){
	wiggling = !wiggling;
	var newWiggleNumber = false;	
	
	var wiggleAscending = true;
	var wiggleArray = [];
	while (wiggleArray.length <= 198){			//assign values in wiggleArray (cyclical from -5 to +5)
		wiggleArray.push(wiggleFactor);
		/*
		if (wiggleAscending && newWiggleNumber){
			wiggleFactor++;
			newWiggleNumber = false;
		}
		*/
		
		if (wiggleAscending){
			if (newWiggleNumber){
				wiggleFactor++;
				newWiggleNumber = false;
			}
			else{
				newWiggleNumber = true;
			}
		}
		else{
			if (newWiggleNumber){
				wiggleFactor--;
				newWiggleNumber = false;
			}
			else{
				newWiggleNumber = true;
			}
		}
		if (wiggleFactor >= 5 || wiggleFactor <= -5){
			if (newWiggleNumber){
				wiggleAscending = !wiggleAscending;
				//newWiggleNumber = true;
			}
		}
	}
	
	var wormSegmentMarginLeftArray = [];			//get snapshot of worm's current marginLeft values for each worm segment 
	for (i = 0; i < wiggleArray.length; i++){
		var tempSegment = "segment" + i;
		wormSegmentMarginLeftArray.push(document.getElementById(tempSegment).style.marginLeft);
	}
	
	var makeWiggle = setInterval(function(){
		if (!wiggling){
			clearInterval(makeWiggle);
		}
		else{
			for (i = 0; i < wiggleArray.length; i++){ 			//assign each wormSegment to new marginLeft value
				var segmentSelect = "segment" + i;
				document.getElementById(segmentSelect).style.marginLeft = parseInt(wormSegmentMarginLeftArray[i]) + wiggleArray[i] + 'px';
			}
			var firstNumWiggleArray = wiggleArray[0];
			for (i = 0; i < wiggleArray.length; i++){
				wiggleArray[i] = wiggleArray[i + 1];
			}
			wiggleArray[198] = firstNumWiggleArray;
		}
	},40);
	
	var makeWiggleY = setInterval(function(){
		if (!wiggling){
			clearInterval(makeWiggleY);
		}
		else{
		
		}	
	},60);
}
											//var radiusAscending = true;//change this to be not random, and to follow a pattern
function changeRadius(){
	changingRadius = !changingRadius;
	var changing = setInterval(function(){
		if (!changingRadius){
			clearInterval(changing);
		}
		else{
			n = Math.floor(15*Math.random());
			
			for (i = 0; i < totalWormDataArray[0].length - 1; i++){
				var j = i % 10;
				var tempSegment = "segment" + i;
				document.getElementById(tempSegment).style.borderRadius = ((n * j)+30) + "px";
			}
		}
	},220);
}	

function shootSegment(){
	document.getElementById("segment0").style.backgroundColor = "white";
}

function changeColors(){
	changingColor = !changingColor;
	var changing = setInterval(function(colorSpeed){
		if(!changingColor){
			clearInterval(changing);
		}
		else{
			var firstWormSegmentColor = document.getElementById("segment0").style.backgroundColor;
			for (i = 0; i < totalWormDataArray[0].length - 1; i++){
				var segmentIdFirst = "segment" + i;
				var segmentIdSecondTempNumber = i + 1;
				var segmentIdSecond = "segment" + segmentIdSecondTempNumber;
				document.getElementById(segmentIdFirst).style.backgroundColor = document.getElementById(segmentIdSecond).style.backgroundColor;
			}
		}
		document.getElementById("segment198").style.backgroundColor = firstWormSegmentColor;
	},colorSpeed);
}

function getColorSpeed(){
	return colorSpeed;
}

function removeWorm(){
	$(".newDiv").remove();						//Worm divs removed; data still saved
}

function makeWormFromMemory(){
	for (j = 0; j < totalWormDataArray.length; j++){
		var currentWorm = totalWormDataArray[j];
			for (i = 0; i < currentWorm.length; i++){
				var newDiv = document.createElement("div");
				newDiv.setAttribute("class","newDiv");
				var tempSegmentId = "segment" + i;					//color change after worm maker redraws worm propagates single color still
				newDiv.setAttribute("id",tempSegmentId);
				newDiv.style.backgroundColor = currentWorm[i].color;
				newDiv.style.height = currentWorm[i].size.height;
				newDiv.style.width = currentWorm[i].size.width;
				newDiv.style.marginLeft = currentWorm[i].position.marginLeft;
				newDiv.style.marginTop = currentWorm[i].position.marginTop;
				document.body.appendChild(newDiv);
				//$(".newDiv").fadeTo("slow",.05);
			}
	}
}

function draw(event){									//initial worm draw gives id="segment198" as height and width = 0px
	if (!wormDone && mouseIsDown){	//added mouseisdown	
		var newDiv = document.createElement("div");			
		newDiv.setAttribute("class","newDiv");
		var segmentId = "segment" + segmentCounter;
		newDiv.setAttribute("id",segmentId);
		var tempName = "worm" + wormNumber;				//set each newDiv with tagName worm#
		newDiv.setAttribute("tagName", tempName);
	
		var color = getColor();
		newDiv.style.backgroundColor = color;
		
		var size = getSize();
		newDiv.style.height = size.height;
		newDiv.style.width = size.width;
	
		var position = {};
		position.marginLeft = event.pageX + 'px';
		position.marginTop = event.pageY + 'px';
		newDiv.style.marginLeft = event.pageX + 'px';
		newDiv.style.marginTop = event.pageY + 'px';		
		//newDiv.style.display = "block";
		document.body.appendChild(newDiv);
		
		var wormSegment = new Object();
		wormSegment.wormId = wormNumber;
		wormSegment.segmentId = segmentCounter;
		segmentCounter++;
		wormSegment.color = color;
		wormSegment.size = size;
		wormSegment.position = position;
		singleWormDataArray.push(wormSegment);
		if (width === 1 && !sizeAscending){
			wormDone = true;
			saveWorm();
		}
	}
}

function saveWorm(){
	totalWormDataArray.push(singleWormDataArray);
	singleWormDataArray = [];
	wormNumber++;		//wormNumber is used to generate each worm's id (e.g., "worm0"). When each worm is finished, this number is incremented, serving to represent the total number of complete worms
	segmentCounter = 0;
	height = 0;
	width = 0;
	sizeAscending = true;
}

function makeWorm(event){
	var leftPosition = event.pageX;
	if (event.pageX < 140 && event.pageY < 50){		//do not draw over buttonBox
		onButtons = true;	
	}
	else{
		onButtons = false;
	}
	if(!wormDone && !onButtons){						//previous line:      if(!wormDone && event.pageX > 100){
		if (!drawOneWormOnly || drawOneWormOnly && wormNumber === 0){
			draw(event);
		}
	}	
}

function getSize(){
	var size = {};
	if(width >= 100){
		sizeAscending = false;
	}	
	if (sizeAscending){
		width++;
	}
	else{
		width--;
	}
	size.width = width + "px";
	size.height = width + "px";
	return size;
}

function getColor(){
/*
	//r = 223;
	//r = Math.floor(255.9*Math.random());
	//g = 23;
	g = Math.floor(255.9*Math.random());
	//b = 201;
	b = Math.floor(255.9*Math.random());
	var tempcolor = "rgb("+r+","+g+","+b+")";
	
	return tempcolor;
*/


	//r = Math.floor(255.9*Math.random());
	g = Math.floor(255.9*Math.random());
	b = Math.floor(255.9*Math.random());
	//r = r;
	//g = 0;
	//b = 0;
	
	var tempcolor = "rgb("+r+","+g+","+b+")";
	if (r >= 256 || r <= 0){
		colorAscending = !colorAscending;
	}
	if (colorAscending){
		r++;
		//b++
		//g++;
	}
	else{
		r--;
		//g--;
		//b--;
	}
	return tempcolor;
}