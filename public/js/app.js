var socket = io();

socket.on('connect',function (){
	console.log('Connected to Socket.io server');
})

socket.on('message', function(message) {
	console.log('New Message:');
	console.log(message.text);

	jQuery('.messages').append('<p>' + message.text + '</p>')
})


//handles submitting of new message
/*
var $form = jQuery('title');
var $form = jQuery('input');
*/
var $form = jQuery('#message-form');

//wait for user to click on submit button
$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');

});