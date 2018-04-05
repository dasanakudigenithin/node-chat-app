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
socket.on('disconnect',()=>{
    console.log('disconnected from serve');
});
})



app.use(express.static(public_path));

server.listen(port,()=>{
console.log("Listening on port 3000");
});