var socket = io();

function scrolling(){
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if( clientHeight + scrollTop + newMessageHeight + lastMessageHeight > scrollHeight){
    messages.scrollTop(scrollHeight);
}
}

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

var template = jQuery('#message-template').html();
var html = Mustache.render(template , {
text: message.text,
from: message.from,
createdAt: formatedTime
});

jQuery('#messages').append(html);
scrolling();

});

socket.on('newLocationMessage', function(message){
    var formatedTime = moment(message.createdAt).format('hh:mm a');
    var template = jQuery('#loc-message-template').html();
    var html = Mustache.render(template , {
    url: message.url,
    from: message.from,
    createdAt: formatedTime
    });
    
    jQuery('#messages').append(html);    
    scrolling();

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