const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
var {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var public_path = path.join( __dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketio(server);
var users = new Users();

io.on('connection',(socket)=>{
console.log('new user connected.');


socket.on('join', (params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and Room name are mandatory.')
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    callback();    
});

socket.on('createMessage',(data , callback)=>{
console.log('Create Message:',data);
io.emit('newMessage',generateMessage(data.from,data.text));
callback();
});

socket.on('locationMessage', (coords)=>{
io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude ,coords.longitude));
});



socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
        io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
    }
});
})



app.use(express.static(public_path));

server.listen(port,()=>{
console.log("Listening on port 3000");
});