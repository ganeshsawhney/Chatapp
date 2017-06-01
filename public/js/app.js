var name = getQueryVariable('name') || 'Annonymous';
var room = getQueryVariable('room') || 'Public Chat';
var socket = io();

socket.on('connect',function (){
	console.log('Connected to Socket.io server');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
})
socket.on('disconnect', function(){
	console.log('Disconnected');

	alert("Internet Disconnected / Server Error");

//Your Code Here
});



jQuery('.room-title').text(room);

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New Message:');
	console.log(message.text);

	if(message.name=='System')
		message.name='<font style="color: red;">System</font>';
	else if(name===message.name)
		message.name='<font style="color: green;">Myself</font>';
	else
		message.name='<font style="color: blue;">'+message.name+'</font>';

	$message.append('<p><strong>' + message.name + ' || ' + momentTimestamp.local().format("D-MMM h:mm:sa") + ':&nbsp </strong></p>');

	$message.append('<p>' + message.text + '</p>');
	$messages.prepend($message);
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
		name: name,
		text: $message.val()
	});

	$message.val('');

});