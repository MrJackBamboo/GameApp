var arr = new Array(42);
var stage = new createjs.Stage("canvas");
var body = document.querySelector('body');
var canvas = document.querySelector('canvas');
var sidebar = document.querySelector('.sidebar');
var canvascubes = document.getElementById('showboard');
var rolldice = document.getElementById('rolldice');
var rotateshape = document.getElementById('rotateshape');
var textturn = document.getElementById('textturn');
var texthint = document.getElementById('texthint');

var ctx = canvascubes.getContext('2d');

var diceTrown = false;
var playerOne = false;
var playerTwo = false;
var playerOneBlocks = new Array(1);
var yourturn = true;

let CWidth = 798; 
let CHeight = 627; 
var socket = io();

let f,s;

sidebar.style.width = body.clientWidth - canvas.width - 100 + "px";
sidebar.style.height = canvas.height - 20 + "px";
sidebar.style.right = 50 + "px";

//creating a visual cubes

ctx.strokeRect(48,50,114,114);
ctx.strokeRect(210,50,114,114);

//end

init();

socket.on('showerrore', function(massage){
	ShowErrore(massage);
});
socket.on('deleteerrore', function(){
	deleteElement(ErroreWindow);
});
socket.on('opponentturn', function(turn, hint){
	textturn.innerHTML = turn;
	texthint.innerHTML = hint;
	rolldice.removeEventListener('click', rollDice, false);
	rotateshape.removeEventListener('click', rotateshape, false);
})

socket.on('clientinfo', function(client){ console.log(client)})


//mousemove on canvas

function init(){
	rolldice.addEventListener('click', rollDice);
	rotateshape.addEventListener('click', rotateshape);
}


body.addEventListener('mousemove', function(evt){
	coursorX = evt.pageX;
	coursorY = evt.pageY;

	if(diceTrown){
		if (playerOne){
				if(typeof stalkingBlock == "undefined"){ // обработчик изменения движения квадратов
					stalkingBlock = new createjs.Shape();
					instalationBlock = new createjs.Shape();
					createRect(f,s, stalkingBlock, "green", 0.75, 1);
					createRect(f,s, instalationBlock, "green", 1, 0);		
				}
				else {
					getACenterOfBlock(stalkingBlock, 1, 0, 0, "1");
					if(typeof instalationBlock != "undefined")
						getACenterOfBlock(instalationBlock, 0, 1, 0, "2");
				}			
		}
		else{ // второй игрок

		}

	} else{ //нужно попросить бросить кубики

	}

})
//end//

//click on button rolldice


function rollDice(){
	if(yourturn && !diceTrown){
		f = Math.round(Math.random() * (6 - 1) + 1);
		s = Math.round(Math.random() * (6 - 1) + 1);
		showCubes(48,50, f);
		showCubes(210,50, s);
		diceTrown = true;	
	}
}

function rotateshape(){
	if(yourturn){
		stage.removeChild(stalkingBlock);
		stage.removeChild(instalationBlock);
		delete stalkingBlock;
		delete instalationBlock;
		stalkingBlock = new createjs.Shape();
		instalationBlock = new createjs.Shape();
		createRect(s,f, stalkingBlock, "green", 0.75, 1);
		createRect(s,f, instalationBlock, "green", 1, 0);	
		[f, s] = [s, f];
	}
}


//mouseclick on canvas
canvas.addEventListener("mousedown", function(){
	if(typeof instalationBlock != "undefined"){
		playerOneBlocks[playerOneBlocks.length-1] = new createjs.Shape();
		createRect(f,s, playerOneBlocks[playerOneBlocks.length-1], "green", 1, 1, coursorX - coursorX % 19, coursorY - coursorY % 19);
		stage.removeChild(instalationBlock);
		delete instalationBlock;
		getACenterOfBlock(playerOneBlocks[playerOneBlocks.length-1], 1, 0, 1);		
		stage.update();	
	}
})


function showCubes(x,y,n) {
	ctx.clearRect(x+1, y+1, 112, 112);
	let array = new Array(3);
	array[0] = [];
	array[1] = [];
	array[2] = [];
	switch(n){
		case 1: array[1][1] = 1; break;
		case 2: array[0][2] = 1; array[2][0] = 1; break;
		case 3: array[0][2] = 1; array[1][1] = 1; array[2][0] = 1; break;
		case 4: array[0][0] = 1; array[0][2] = 1; array[2][0] = 1; array[2][2] = 1; break;
		case 5: array[0][0] = 1; array[0][2] = 1; array[1][1] = 1; array[2][0] = 1; array[2][2] = 1; break;
		case 6: array[0][0] = 1; array[0][2] = 1; array[1][0] = 1; array[1][2] = 1; array[2][0] = 1; array[2][2] = 1; break;
	}

	ctx.beginPath();
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(array[i][j]){
				ctx.moveTo(x+23+34*j, y+23+34*i);
				ctx.arc(x+23+34*j, y+23+34*i, 12, 0, Math.PI*2);
			}
		}
	}
	ctx.fill();
	ctx.closePath();

	
}

//end

//creating a notebook sheet

	for (var i = 0; i < 42; i++){
		arr[i] = new Array(33);
		for (var j = 0; j < 33; j++) {
		    arr[i][j] = new createjs.Shape();
			arr[i][j].graphics.beginStroke("#9FD0EB").drawRect(i*19, j*19, 19, 19);
		    stage.addChild(arr[i][j]);
		}
	}
	line = new createjs.Shape();
	line.graphics.beginStroke("#EE2A2A").moveTo(0, 28 * 19).lineTo(42 * 19, 28 * 19);
	stage.addChild(line);
	stage.update();
//end//





function createRect(first, second, shape, color, alpha, text, cx, cy){
	if (cx && cy) {
		shape.x = cx;
		shape.y = cy;
	}
	else {
		shape.x = coursorX;
		shape.y = coursorY;
	}
	shape.graphics.beginStroke(color).drawRect(0, 0, 19 * first, 19 * second);
	shape.alpha = alpha;
	if(text){
		shape.text = new createjs.Text(first * second, "15px Arial",color);
		stage.addChild(shape.text);
	}
	stage.addChild(shape);
	stage.update();		
}

function getACenterOfBlock(shape, text, forInstalation, instalated, qwe) {
	if (!forInstalation && !instalated){ //блок преследователь
		shape.x = coursorX;
		shape.y = coursorY;
	}
	else{
		if( coursorX > CWidth - f * 19 && coursorY > CHeight - (5+s-0.5) * 19){
			shape.x = CWidth - f * 19;
			shape.y = CHeight - (5+s) * 19;
		}
		else if(coursorY > CHeight - (5+s-0.5) * 19){ //значит курсор в поле канваса и не за красной линией
			shape.x = coursorX - coursorX % 19;
			shape.y = CHeight - (5+s) * 19;
		}
		else if(coursorX > CWidth - (f-0.5) * 19){
			shape.x = CWidth - f * 19;
			shape.y = coursorY - coursorY % 19;
		}
		else {
			shape.x = coursorX - coursorX % 19;
			shape.y = coursorY - coursorY % 19;
		}
	}

	if (text){
		if (f * s > 9){
			shape.text.x = (shape.x + (shape.x + f * 19)) / 2 - 8.5;
			shape.text.y = (shape.y + (shape.y + s * 19)) / 2 - 8.5;
		} else {
			if (f == 1 || s == 1) { //если один из кубиков показал 1
				if (f == 1 && s == 1){
					shape.text.x = shape.x + f * 4.25;
					shape.text.y = shape.y + s * 2;
				} else if(f == 1){
					shape.text.x = shape.x + f * 4.5;
					shape.text.y = (shape.y + (shape.y + s * 19)) / 2 - 8.5;
				} else{
					shape.text.x = (shape.x + (shape.x + f * 19)) / 2 - 5;
					shape.text.y = shape.y + s * 2;
				}
			}
		 	else { //2,2; 2,3; 2,4; 3,2; 3,3; 4,2
				shape.text.x = shape.x + f * 19 / 2 - 4.5;
				shape.text.y = shape.y + s * 19 / 2 - 7.5;
			}
		}
	}	

	stage.update();	
}


//1. написать серверную часть: разграничения по ходам
