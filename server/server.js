const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
var public_path = path.join( __dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketio(server);

io.on('connection',(socket)=>{
console.log('new user connected.');

socket.emit('newEmail',{
    from : 'nithin.kk.com',
    text: 'HOW YOU DOING?'
});


socket.on('createMessage',(data)=>{
console.log('Create Message:',data);
io.emit('newMessage',{
    from: data.from,
    text: data.text,
    createdAt: new Date().getTime()
});
});

socket.on('disconnect',()=>{
    console.log('disconnected from serve');
});
})



app.use(express.static(public_path));

server.listen(port,()=>{
console.log("Listening on port 3000");
});