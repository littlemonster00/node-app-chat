const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const pathPublic = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(pathPublic));

io.on('connection', (socket) => {
  console.log('New connected');
// Welcome to chat app
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to chat app',
    createdAt: new Date().getTime()
  });
// welcome to new user for such user existing
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('message', message);
    // emit every single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime() 
    });

  });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => console.log(`Server is up ${port}`));