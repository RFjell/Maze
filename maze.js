var width = 10;
var height = 10;
var cellSize = 15;
var buffert = cellSize;
var gameOver = true;
var grid;
var canvasMaze;
var canvasPlayer;
var ctx;
var ctxMaze;
var finishPoint;
var playerPosition;

function init() {
	canvasMaze = document.getElementById("canvas-maze");
	canvasPlayer = document.getElementById("canvas-player");
	ctxMaze = canvasMaze.getContext("2d");
	ctx = canvasPlayer.getContext("2d");
	gameOver = false;
	createMaze();
	playerPosition = [ random(width), random(height) ];
	finishPoint = [ random(width), random(height) ];
	resize_canvas();
}

function random( num ) {
	return Math.floor( Math.random()*num );
}

function resize_canvas(){
	canvasMaze = document.getElementById("canvas-maze");
	canvasMaze.width = document.getElementById("canvas-div").clientWidth - 20;
	canvasMaze.height = document.getElementById("canvas-div").clientHeight - 20;
	canvasPlayer = document.getElementById("canvas-player");
	canvasPlayer.width = document.getElementById("canvas-div").clientWidth - 20;
	canvasPlayer.height = document.getElementById("canvas-div").clientHeight - 20;
	cellSize = Math.floor(Math.min(canvasMaze.height /height, canvasMaze.width / width));
	buffert = cellSize;
	canvasMaze.width += buffert*2;
	canvasMaze.height += buffert*2;
	canvasPlayer.width += buffert*2;
	canvasPlayer.height += buffert*2;
	drawMaze();
	drawFinishLine();
	drawPlayer();
}

function getXY() {
	let tmp = document.getElementById('x').value;
	if(tmp) width = tmp;
	tmp = document.getElementById('y').value;
	if(tmp) height = tmp;
	init();
}

function createMaze() {
	grid = new Array(width);
	for(let i = 0; i < width; i++) {
		grid[i] = new Array(height);
		for(let j = 0; j < height; j++){
			grid[i][j] = { west: true, south: true, visited: false };
		}
	}
	depthFirstSearch(0,0);
}

function depthFirstSearch(x,y) {
	grid[x][y].visited = true;
	while(true) {
		let unvisited = [];
		if(x > 0 && !grid[x-1][y].visited)
			unvisited.push( [x-1, y] );
		if( x < width - 1 && !grid[x + 1][y].visited)
			unvisited.push( [x+1, y] );
		if( y > 0 && !grid[x][y-1].visited)
			unvisited.push( [x, y-1] );
		if( y < height - 1 && !grid[x][y+1].visited)
			unvisited.push( [x, y+1] );

		if( unvisited.length == 0 )
			return;

		let rand = random( unvisited.length );

		let x_ = unvisited[rand][0];
		let y_ = unvisited[rand][1];

		if( x > x_) {
			grid[x][y].west = false;
		} else if( x < x_) {
			grid[x_][y_].west = false;
		} else if( y < y_) {
			grid[x][y].south = false;
		} else if( y > y_) {
			grid[x_][y_].south = false;
		}
		depthFirstSearch(x_,y_);
	}
}

