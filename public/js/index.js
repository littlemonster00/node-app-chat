var socket = io(); /* make request from the client to the server to open up a web socket keep open*/
socket.on('connect', function () {
	console.log('Connect to server');

	socket.on('newMessage', function (message) {
		console.log('newMeassage', message);
		var li = jQuery('<li></li>');
		li.text(`${message.from}: ${message.text}`);
		jQuery('#messages').append(li);
	});
});
socket.on('disconnect', function () {
	console.log('disconnect from server');
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'user',
		text: jQuery('[name=message]').val()
	}, function () {

	});
});