var socket = io();
socket.on('connect',function(){
    console.log('connected to server.');
});

socket.on('disconnect',function(){
    console.log('disconnected from serve');
});

socket.on('newEmail', function(email){
console.log('new Email.',email);
});

socket.on('newMessage',function(message){
console.log('New Message: ',message);
});