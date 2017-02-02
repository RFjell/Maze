var width = 10;
var height = 10;
var cellSize = 15;
var buffert = cellSize;
var gameOver = true;
var grid;
var canvas;
var ctx;
var finishPoint;
var playerPosition;

function init() {
	canvas = document.getElementById("canvas");
	canvas.width = document.getElementById("canvas-div").clientWidth - 20;
	canvas.height = document.getElementById("canvas-div").clientHeight - 20;
	cellSize = Math.floor(Math.min(canvas.height /height, canvas.width / width));
	buffert = cellSize;
	gameOver = false;
	canvas.width += buffert*2;
	canvas.height += buffert*2;
	ctx = canvas.getContext("2d");
	createMaze();
	playerPosition = [Math.floor(Math.random()*width),Math.floor(Math.random()*height)];
	finishPoint = [Math.floor(Math.random()*width),Math.floor(Math.random()*height)];
	return setInterval(draw, 10);
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

		let rand = Math.floor( Math.random() * unvisited.length );

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

