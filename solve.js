
function startSolving(){
	var start = playerPosition;
	if( start == finishPoint )
		return;

	for(let i = 0; i < width; i++) {
		for(let j = 0; j < height; j++){
			grid[i][j].visited = false;
		}
	}

	solve(start[0], start[1]);
	drawCorrectPath();
}

function solve( x, y ) {
	if( grid[x][y].visited )
		return false;
	grid[x][y].visited = true;
	if( x == finishPoint[0] && y == finishPoint[1] ) {
		return true;
	}
	while(true) {
		let unvisited = [];
		if(x > 0 && !grid[x-1][y].visited && !grid[x][y].west )
			unvisited.push( [x-1, y] );
		if( x < width - 1 && !grid[x + 1][y].visited && !grid[x+1][y].west)
			unvisited.push( [x+1, y] );
		if( y > 0 && !grid[x][y-1].visited && !grid[x][y-1].south)
			unvisited.push( [x, y-1] );
		if( y < height - 1 && !grid[x][y+1].visited && !grid[x][y].south)
			unvisited.push( [x, y+1] );

		if( unvisited.length == 0 ) {
			grid[x][y].correctPath = false;
			return;
		}

		let x_ = unvisited[0][0];
		let y_ = unvisited[0][1];

		if( solve(x_, y_) ) {
			grid[x_][y_].correctPath = true;
			return true;
		}
	}
}
