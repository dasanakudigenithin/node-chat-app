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
var li = jQuery('<li></li>');
li.text(`${message.from} : ${message.text}`);
jQuery('#messages').append(li);
});

jQuery('#messageForm').on('submit',function (e) {
e.preventDefault();
socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
}, function () {

});
});

//socket.emit('createMessage',{from:'sdsddfsf',text:'sdacaaaa svsfsv '});