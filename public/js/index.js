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
var formatedTime = moment(message.createdAt).format('hh:mm a');
var li = jQuery('<li></li>');
li.text(`${message.from} ${formatedTime} : ${message.text}`);
jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formatedTime = moment(message.createdAt).format('hh:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My loctaion</a>');

    li.text(`${message.from} ${formatedTime} : `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});


jQuery('#messageForm').on('submit',function (e) {
e.preventDefault();

var textbox = jQuery('[name=message]');

socket.emit('createMessage', {
    from: 'User',
    text: textbox.val()
}, function () {
    textbox.val('');
});
});

var locationButton = jQuery('#location');
locationButton.on('click',function (e) {
    if(!navigator.geolocation){
       return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (pos){
        locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('locationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
    });
    }, function (){
        locationButton.removeAttr('disabled').text('Send Location');
        return alert('Unable to fetch location.')
        });
    });

//socket.emit('createMessage',{from:'sdsddfsf',text:'sdacaaaa svsfsv '});