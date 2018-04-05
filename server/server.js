const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

var {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
var public_path = path.join( __dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketio(server);

io.on('connection',(socket)=>{
console.log('new user connected.');


socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined.'));


socket.on('createMessage',(data , callback)=>{
console.log('Create Message:',data);
io.emit('newMessage',generateMessage(data.from,data.text));
callback('This is from server ');
// socket.broadcast.emit('newMessage',{
//     from: data.from,
//     text: data.text,
//     createdAt: new Date().getTime()
// });
});

socket.on('disconnect',()=>{
    console.log('disconnected from serve');
});
})



app.use(express.static(public_path));

server.listen(port,()=>{
console.log("Listening on port 3000");
});