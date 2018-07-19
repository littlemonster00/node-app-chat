var socket = io(); /* make request from the client to the server to open up a web socket keep open*/
socket.on('connect', function () {
	console.log('Connect to server');

	socket.on('newMessage', function (message) {
		console.log('newMeassage', message);
	});
});
socket.on('disconnect', function () {
	console.log('disconnect from server');
});
