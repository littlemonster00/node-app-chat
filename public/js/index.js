
var socket = io(); /* make request from the client to the server to open up a web socket keep open*/
socket.on('connect', function () {
	console.log('Connect to server');

	socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: 'user',
      createdAt: formattedTime
    });
    jQuery('#messages').append(html)
  });

  socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
      url: message.url,
      from: 'user',
      createdAt: formattedTime
    });
    jQuery('#messages').append(html);
  });
});

socket.on('disconnect', function () {
	console.log('disconnect from server');
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  
  var messageTextbox = jQuery('[name=message]')
	socket.emit('createMessage', {
		from: 'user',
		text: messageTextbox.val()
	}, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if(!navigator.geolocation) {
		return alert('Geolocatin not supported on your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Send location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
     socket.emit('createLocationMessage', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable fetch location!');
  })
});