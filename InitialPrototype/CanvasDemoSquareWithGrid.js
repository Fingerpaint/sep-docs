/*
 * author: http://toc.oreilly.com/2011/11/html5-for-publishers-canvas.html
 * Draws in a square around the cursor in the grid
 */

window.addEventListener('load', eventWindowLoaded, false);	
function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport () {
    return Modernizr.canvas;
}

var theCanvas;
var context;
var gridSize = 5; //size of one grid cell
var cursorSize = 25; //radius of the drawing cursor

function canvasApp(){
    if (!canvasSupport()) {
return;
    }else{
    theCanvas = document.getElementById('canvas');
    context = theCanvas.getContext('2d');
var redButton = document.getElementById("Red");
var orangeButton = document.getElementById("Orange");
var yellowButton = document.getElementById("Yellow");
var greenButton = document.getElementById("Green");
var blueButton = document.getElementById("Blue");
var purpleButton = document.getElementById("Purple");
var brownButton = document.getElementById("Brown");
var blackButton = document.getElementById("Black");
var whiteButton = document.getElementById("White");
var colorChosen = document.getElementById("color_chosen");
var resetButton = document.getElementById("reset_image");
        redButton.addEventListener('click', colorPressed, false);
        orangeButton.addEventListener('click', colorPressed, false);
        yellowButton.addEventListener('click', colorPressed, false);
        greenButton.addEventListener('click', colorPressed, false);
        blueButton.addEventListener('click', colorPressed, false);
        purpleButton.addEventListener('click', colorPressed, false);
        brownButton.addEventListener('click', colorPressed, false);
        blackButton.addEventListener('click', colorPressed, false);
        whiteButton.addEventListener('click', colorPressed, false);
        resetButton.addEventListener('click', resetPressed, false);
drawScreen();
    }

    function drawScreen() {
theCanvas.addEventListener('mousedown', mouse_pressed_down, false);
theCanvas.addEventListener('mousemove', mouse_moved, false);
theCanvas.addEventListener('mouseup', mouse_released, false);
theCanvas.addEventListener('touchmove', touch_move_gesture, false);
context.fillStyle = 'white';
context.fillRect(0, 0, theCanvas.width, theCanvas.height);
context.strokeStyle = '#000000';
context.strokeRect(1, 1, theCanvas.width-2, theCanvas.height-2);
// Introducing new function to draw the vector grid
drawGrid();
    }

    // Function for drawing a nice grid in the background
    function drawGrid(){
    	context.strokeStyle = '#000000';
    	for(var x = 0; x < theCanvas.width; x = x+gridSize){
    		for(var y = 0; y < theCanvas.height; y = y+gridSize){
    			context.strokeRect(x,y,gridSize,gridSize);
    		}
    	}
    }
    
    // For the mouse_moved event handler.
    var begin_drawing = false;
    
    function mouse_pressed_down (ev) {
begin_drawing = true;
context.fillStyle = colorChosen.innerHTML;
    }

    function mouse_moved (ev) {
var mouseX, mouseY;	
// Get the mouse position in the canvas
// We give the mouse position an offset to compensate for error
var offset = 0;
mouseX = ev.pageX + offset;
mouseY = ev.pageY + offset;

//if (begin_drawing) { //original function to draw
//context.beginPath();
//context.arc(x, y, cursorSize, (Math.PI/180)*0, (Math.PI/180)*360, false);
//context.fill();
//            context.closePath();
//}
//if (begin_drawing){ //test function to determine in which grid cell the cursor is
//	var rectX = x / gridSize - (x%gridSize)/gridSize;
//	var rectY = y / gridSize - (y%gridSize)/gridSize;
//	context.fillStyle = colorChosen.innerHTML;
//	context.fillRect(rectX*gridSize,rectY*gridSize,gridSize,gridSize);
//}

if(begin_drawing){
	//defining a bounding square for the cursor circle
	var minX = mouseX - cursorSize;
	var maxX = mouseX + cursorSize;
	var minY = mouseY - cursorSize;
	var maxY = mouseY + cursorSize;
	
	//Calculate the minimum and maximum grid cell numbers for both X- and Y coordinates 
	//(basically rounded bounding squares).
	var minrectX = minX / gridSize - (minX%gridSize)/gridSize;
	var maxrectX = maxX / gridSize - (maxX%gridSize)/gridSize;
	var minrectY = minY / gridSize - (minY%gridSize)/gridSize;
	var maxrectY = maxY / gridSize - (maxY%gridSize)/gridSize;
	
	context.fillStyle = colorChosen.innerHTML;
	for(var x = minrectX; x <= maxrectX; x++){
		for(var y = minrectY; y <= maxrectY; y++){
			context.fillRect(x*gridSize+1,y*gridSize+1,gridSize-2,gridSize-2);
		}
	}
    }
    }

    function mouse_released (ev) {
begin_drawing = false;
    }

    function touch_move_gesture (ev) {
// For touchscreen browsers/readers that support touchmove
var x, y;
ev.preventDefault(); // override default UI behavior for better results on
						// touchscreen devices
context.beginPath();
context.fillStyle = colorChosen.innerHTML;
if(ev.touches.length == 1){
var touch = ev.touches[0];
x = touch.pageX;
y = touch.pageY;
context.arc(x, y, 7, (Math.PI/180)*0, (Math.PI/180)*360, false);
context.fill();
}
    }

    function colorPressed(e) {
var color_button_selected = e.target;
var color_id = color_button_selected.getAttribute('id');
colorChosen.innerHTML = color_id;
    }

    function resetPressed(e) {
        theCanvas.width = theCanvas.width; // Reset grid
        drawScreen();
    }
}