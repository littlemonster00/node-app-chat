const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const pathPublic = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(pathPublic));

io.on('connection', (socket) => {

  console.log('New connected');
// will send to all the clients
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
// will send the message to all the other clients except the newly created connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('message', message);
    // emit every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => console.log(`Server is up ${port}`));