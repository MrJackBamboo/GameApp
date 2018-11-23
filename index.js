var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
 
var players = {}; 
//var countPlayers = 0;

app.get('/main.css', function(req, res){
  res.sendFile(__dirname + '/public/stylesheets/main.css');
});
app.get('/main.js', function(req,res){
  res.sendFile(__dirname + '/js/main.js');
});
app.get('/second.js', function(req, res){
  res.sendFile(__dirname + '/js/second.js');
});
app.get('/app', function(req, res){
  res.sendFile(__dirname + '/days/app.html');
});

function user(id,textid){
  this.id = id;
  this.textid = textid;
  this.score = 0;
}

function countKeys(obj) {
  let counter = 0;
  for (var key in obj) {
    counter++;
  }
  return counter;
}

io.on('connection', function(client) {
  if(countKeys(players) == 0){
    players[countKeys(players)] = new user(1,client.id);
    client.emit('showerrore', "Welcome. The game will start after connecting the second user.");
  }
  else if(countKeys(players) == 1){
    players[countKeys(players)] = new user(2,client.id);
    client.broadcast.emit('deleteerrore','');
    client.emit('opponentturn', "Your opponent turn", "Wait until it`s end.");
  }
  else {
    console.log(players)
    players[countKeys(players)] = new user(3,client.id);
    client.emit('showerrore', "We apologize, but the Board is busy. Wait until one of the players leaves the game.");
  }

  client.on('clickdone', function(value, id){
    if (value){client.broadcast.emit('enemyclick', "X", id);}
    else {client.broadcast.emit('enemyclick', "O", id);} 
  });

  client.on('disconnect', function () {
    console.log(players)
    for(userid in players){
      if(players[userid].textid == client.id){
        delete players[userid];
      }
    }
  });
});




http.listen(port, function(){
  console.log('listening on *:' + port);
});
