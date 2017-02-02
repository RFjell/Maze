function doKeyDown(e){
	if( gameOver ) {
		return;
	}
	switch (e.keyCode) {
		case 38:  /* Up arrow */
			if( playerPosition[1] > 0 && !grid[playerPosition[0]][playerPosition[1]-1].south ) {
				playerPosition[1] -= 1;
			}
			break;
		case 40:  /* Down arrow */
			if( playerPosition[1] < height - 1 && !grid[playerPosition[0]][playerPosition[1]].south ) {
				playerPosition[1] += 1;
			}
			break;
		case 37:  /* Left arrow */
			if( playerPosition[0] > 0 && !grid[playerPosition[0]][playerPosition[1]].west ) {
				playerPosition[0] -= 1;
			}
			break;
		case 39:  /* Right arrow */
			if( playerPosition[0] < width - 1 && !grid[playerPosition[0]+1][playerPosition[1]].west ) {
				playerPosition[0] += 1;
			}
			break;
	}
	if( playerPosition[0] == finishPoint[0] && playerPosition[1] == finishPoint[1] ) {
		gameOver = true;
	}
}
window.addEventListener('keydown',doKeyDown,true);
