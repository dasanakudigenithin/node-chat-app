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

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My loctaion</a>');

    li.text(`${message.from} : `);
    a.attr('href',message.url);
    li.append(a);
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

var locationButton = jQuery('#location');
locationButton.on('click',function (e) {
    if(!navigator.geolocation){
       return alert('Geolocation not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(function (pos){
    socket.emit('locationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
    });
    }, function (){
        return alert('Unable to fetch location.')
        });
    });

//socket.emit('createMessage',{from:'sdsddfsf',text:'sdacaaaa svsfsv '});