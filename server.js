var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

io.on('connection',function (socket){
	console.log('User connected vis Socket.io');

	socket.on('message', function (message) {
		console.log('Message Recieved: ' + message.text);
		//now the message has been recieved but it doesnot gets sent out to do this do below:

		//send to everybody including person who sent it use io.emit
		//send to everyone except person who sent it use below
		socket.broadcast.emit('message', message);
	});

	//event, data to send
	socket.emit('message',{ 
		text: 'Welcome to the Chat Application'
	});
});

http.listen(PORT, function(){
	console.log("Server Started");
})