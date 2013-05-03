/*
 * author: http://toc.oreilly.com/2011/11/html5-for-publishers-canvas.html
 * DemoWithGrid
 */

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport() {
	return Modernizr.canvas;
}

var theCanvas;
var context;
var gridSize = 5; // size of one grid cell
var cursorSize = 25; // radius of the drawing cursor

function canvasApp() {
	if (!canvasSupport()) {
		return;
	} else {
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
		context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
		// Introducing new function to draw the vector grid
			drawGrid();
	}

	// Function for drawing a nice grid in the background
	function drawGrid() {
		context.strokeStyle = '#000000';
		for ( var x = 0; x < theCanvas.width; x = x + gridSize) {
			for ( var y = 0; y < theCanvas.height; y = y + gridSize) {
				context.strokeRect(x, y, gridSize, gridSize);
			}
		}
	}

	// For the mouse_moved event handler.
	var begin_drawing = false;

	function mouse_pressed_down(ev) {
		begin_drawing = true;
		context.fillStyle = colorChosen.innerHTML;
	}

	function mouse_moved(ev) {
		var mouseX, mouseY;
		// Get the mouse position in the canvas
		// We give the mouse position an offset to compensate for error
		var offset = 0;
		mouseX = ev.pageX + offset;
		mouseY = ev.pageY + offset;

		if (begin_drawing) {
			// defining a bounding square for the cursor circle
			var minX = mouseX - cursorSize;
			var maxX = mouseX + cursorSize;
			var minY = mouseY - cursorSize;
			var maxY = mouseY + cursorSize;

			// Calculate the minimum and maximum grid cell numbers for both X-
			// and Y coordinates
			// (basically rounded bounding squares).
			var minrectX = minX / gridSize - (minX % gridSize) / gridSize;
			var maxrectX = maxX / gridSize - (maxX % gridSize) / gridSize;
			var minrectY = minY / gridSize - (minY % gridSize) / gridSize;
			var maxrectY = maxY / gridSize - (maxY % gridSize) / gridSize;

			context.fillStyle = colorChosen.innerHTML;
			for ( var x = minrectX; x <= maxrectX; x++) {// initial selection
															// loops to
															// determine
				for ( var y = minrectY; y <= maxrectY; y++) {// which grid
																// cells are
																// close enough
					if (intersectRadius(x, y, mouseX, mouseY)) {
						context.fillRect(x * gridSize + 1, y * gridSize + 1,
								gridSize - 2, gridSize - 2);
					}
				}
			}
		}
	}

	// determines more accurately if a grid cell (x,y) is within cursor radius
	function intersectRadius(x, y, mouseX, mouseY) {
		var minX = x * gridSize;
		var maxX = (x + 1) * gridSize;
		var minY = y * gridSize;
		var maxY = (y + 1) * gridSize;
		// case distinction to determine the closest corner of the grid cell to
		// the mouse cursor
		/*
		 *  1 |  2  | 3 
		 * ---|-----|--- 
		 *  8 |Mouse| 4 
		 * ---|-----|--- 
		 *  7 |  6  | 5  
		 * Mouse is the mouse location, 1-8 are possible locations the square can be in.
		 * The corner cases represent a situation where all x- and y values of
		 * the square are either greater or smaller than the mouse location. The
		 * other cases represent when this is not the case.
		 */

		if (minX >= mouseX) {
			if (minY >= mouseY) {
				return pythagoras(minX - mouseX, minY - mouseY) < cursorSize; // case
																				// 5
			} else {// ignoring case 4, minY < mouseY < maxY for convenience;
				return pythagoras(minX - mouseX, mouseY - maxY) < cursorSize; // case
																				// 3
			}
		} else {// ignoring case 2&6, minX < mouseX < maxX for convenience
			if (minY >= mouseY) {
				return pythagoras(mouseX - maxX, minY - mouseY) < cursorSize; // case
																				// 7
			} else {// ignoring case 8, minY < mouseY < maxY for convenience
				return pythagoras(mouseX - maxX, mouseY - maxY) < cursorSize; // case
																				// 1
			}
		}
	}

	function pythagoras(a, b) {
		return Math.sqrt(a * a + b * b);
	}

	function mouse_released(ev) {
		begin_drawing = false;
	}

	function touch_move_gesture(ev) {
		// For touchscreen browsers/readers that support touchmove
		var x, y;
		ev.preventDefault(); // override default UI behavior for better
								// results on
		// touchscreen devices
		context.beginPath();
		context.fillStyle = colorChosen.innerHTML;
		if (ev.touches.length == 1) {
			var touch = ev.touches[0];
			x = touch.pageX;
			y = touch.pageY;
			context.arc(x, y, 7, (Math.PI / 180) * 0, (Math.PI / 180) * 360,
					false);
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