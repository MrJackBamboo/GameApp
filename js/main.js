var canvas, LeftScore, RightScore, FPlayer, SPlayer;
var leftcounter = 0;
var rightcounter = 0;
var delta = [ 0, 0 ];
var stage = [ window.screenX, window.screenY, window.innerWidth, window.innerHeight ];


var LeftSide, RightSide;
var socket = io();
//окно приветствия
      // function ChangeParent(value){
      //             var RoomInput = document.createElement('input');
      //     		RoomInput.placeholder = "Enter room number";
      //             var SubmitButton = document.createElement('button');
      //     		if (value == "create") {
      //     			create.setAttribute("disabled",true);
      //     			join.removeAttribute('disabled',true); 
      //     		    RoomInput.id = "InputCreate";
      //     		    SubmitButton.id = "SubmitCreate";
      //     	        SubmitButton.innerText = "Создать";
      //     	        SubmitButton.addEventListener("mousedown", function(evt){
      //                 	if (RoomInput.value == "")
      //               			ShowErrore("Введите название доски","");
      //                  	else 
      //                  		socket.emit("board create37", RoomInput.value);
      //         			});
      //       		}
      //             else {
      //               	create.removeAttribute("disabled",true);
      //               	join.setAttribute("disabled",true);
      //         		RoomInput.id = "InputJoin";
      //         		SubmitButton.id = "SubmitJoin";
      //               	SubmitButton.innerText = "Присоединиться";
      //               	SubmitButton.addEventListener("mousedown", function(evt){
      //                 	if (RoomInput.value == "")
      //               			ShowErrore("Введите название доски","");
      //                 	else 
      //         				socket.emit("board join37", RoomInput.value);
      //         			});
      //       			}

      //             RoomInput.style.width = "115px";
      //       		SubmitButton.style.width = "119px";     
      //             if (InputDiv != null){
      //               parent.removeChild(InputDiv);
      //               parent.removeChild(SubmitDiv);
      //       		}	
      //             InputDiv = document.createElement('div');
      //             InputDiv.className = "inputdiv navigate";
      //             SubmitDiv = document.createElement('div');
      //       SubmitDiv.className = "submitdiv navigate";
                  
      //       		InputDiv.appendChild(RoomInput);
      //             SubmitDiv.appendChild(SubmitButton);
      //       		parent.appendChild(InputDiv);
      //             parent.appendChild(SubmitDiv);
      // };

// socket.on('user connected37', function(UserId, boardname, board37, PlayerNumb){
// 	BName = boardname;
// 	var RoomName = document.createElement('div');
// 	RoomName.className = "RoomName";
// 	RoomName.innerHTML = BName;
// 	DialogWindow = document.getElementsByClassName('DialogWindow')[0];
//     if( typeof DialogWindow != 'undefined'){
//       document.body.removeChild(DialogWindow);
//     }
//     init();
//     MainBall = document.getElementById('ball');
// 	play();
//  	canvas.appendChild(RoomName);
//     canvas.style.visibility = "visible";
//     createInstructions(PlayerNumb, UserId, boardname);
//     socket.emit('user done37', bodies[0].m_position.x, bodies[0].m_position.y, boardname);
// });
	
// socket.on('user done37', function(PlayerNumb, UserId, boardname){
// 	createInstructions(PlayerNumb, UserId, boardname);
// });

// socket.on('users base37', function(UserId, boardname){
// 	createInstructions("FPlayer", UserId, boardname);      
// });

// socket.on('user disconnected37', function(UserId, boardname){
//   console.log(boardname);
//   canvas.removeChild(document.getElementById(UserId));
//   socket.emit('final score', LeftScore.innerHTML, RightScore.innerHTML, boardname);
//   LeftScore.innerHTML = "0";
//   RightScore.innerHTML = "0"; 
//   ball[0].m_position.x = stage[2] * 0.5;
//   ball[0].m_position.y = stage[3] * 0.1;
//   MainBall.style.left = stage[2] * 0.5 + 'px';
//   MainBall.style.top = stage[3] * 0.1 + 'px';
//   walls[5] = createBox(world, stage[2] / 2, stage[3] * 0.25, 20, 20);
// });



function init() {

	canvas = document.getElementById('canvas');
	LeftScore = document.getElementById('left');
	RightScore = document.getElementById('right');

}

function Score(value){
	if( value == 'left'){
		leftcounter += 1;
		LeftScore.innerHTML = leftcounter;
	}
	else {
		rightcounter += 1;
		RightScore.innerHTML = rightcounter;
	}

}

function ShowErrore(first){
	ErroreWindow = document.createElement('div');
	ErroreWindow.className = "ErroreWindow";
	ErroreWindow.innerHTML = first;
	document.body.appendChild(ErroreWindow);
}

function deleteElement(Element){
  //setTimeout(function(){ 
    document.body.removeChild(Element)
    //},2500);
};

//






