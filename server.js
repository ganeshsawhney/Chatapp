var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var moment = require('moment');

app.use(express.static(__dirname + '/public'))

io.on('connection',function (socket){
	console.log('User connected vis Socket.io');

	socket.on('message', function (message) {
		console.log('Message Recieved: ' + message.text);

		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	//event, data to send
	socket.emit('message',{ 
		name: 'System',
		text: 'Welcome to the Chat Application',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function(){
	console.log("Server Started");
})