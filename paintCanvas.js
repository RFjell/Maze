function clearPlayer() {
	ctx.clearRect( buffert + playerPosition[0]*cellSize - cellSize/2 ,
					buffert + playerPosition[1]*cellSize - cellSize/2 , cellSize, cellSize);
}

function drawRect(x,y,w,h,ctx) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function drawLine(x1,y1,x2,y2,ctx) {
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function drawPlayer() {
	let w = cellSize / 4;
	let h = cellSize;
	let bx = buffert + playerPosition[0]*cellSize - cellSize/2;
	let by = buffert + playerPosition[1]*cellSize - cellSize/2;
	//Head
	ctx.beginPath();
	ctx.arc( bx + 2*w, by + h/4, h/10, 0, Math.PI*2, true);
	ctx.stroke();
	//Body
	ctx.moveTo(bx + 2*w, by + h/4+h/10);
	ctx.lineTo(bx + 2*w, by + h-h/4);
	ctx.stroke();
	//Legs
	ctx.moveTo(bx + w, by + h - 2);
	ctx.lineTo(bx + 2*w, by + h-h/4);
	ctx.lineTo(bx + 3*w, by + h - 2);
	ctx.stroke();
	ctx.stroke();
	//Arms
	if( gameOver ) {
		ctx.moveTo(bx + w, by + h/4);
		ctx.lineTo(bx + 2*w, by + h/2-h/12);
		ctx.lineTo(bx + 3*w, by + h/4);
		ctx.stroke();
	} else {
		ctx.moveTo(bx + w, by + h/2);
		ctx.lineTo(bx + 2*w, by + h/2-h/12);
		ctx.lineTo(bx + 3*w, by + h/2);
		ctx.stroke();
	}
}

function drawFinishLine() {
	ctxMaze.fillStyle = "green";
	if( cellSize/2 + 5 < cellSize - 10) {
		drawRect(buffert + cellSize*finishPoint[0] - cellSize/2 + 5,buffert + cellSize*finishPoint[1] - cellSize/2 + 5,cellSize -10,cellSize -10, ctxMaze);
	} else {
		drawRect(buffert + cellSize*finishPoint[0] - cellSize/2 + 1,buffert + cellSize*finishPoint[1] - cellSize/2 + 1,cellSize -2,cellSize -2, ctxMaze);
	}
}

function drawMaze() {
	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[0].length; j++) {
			let c = grid[i][j];
			if( j == 0 ) {
				drawLine(	buffert - cellSize/2, buffert - cellSize/2, 
									buffert + (grid.length-1) * cellSize + cellSize/2, buffert - cellSize/2, ctxMaze);
			}
			if( i == grid.length - 1 ) {
				drawLine(	buffert + i*cellSize + cellSize/2, buffert + j*cellSize + cellSize/2, 
									buffert + i*cellSize + cellSize/2, buffert + j*cellSize - cellSize/2, ctxMaze);
			}
			if( c.south ) {
				drawLine(	buffert + i*cellSize - cellSize/2, buffert + j*cellSize + cellSize/2, 
									buffert + i*cellSize + cellSize/2, buffert + j*cellSize + cellSize/2, ctxMaze);
			}
			if( c.west ) {
				drawLine(	buffert + i*cellSize - cellSize/2, buffert + j*cellSize + cellSize/2, 
									buffert + i*cellSize - cellSize/2, buffert + j*cellSize - cellSize/2, ctxMaze);
			}
		}
	}
}

function drawWinMessage() {
	ctxMaze.font = "30px Arial";
	ctxMaze.fillText("Congrats",canvasMaze.width/2 - 15,50);
}

function draw() {
	drawPlayer();
}
