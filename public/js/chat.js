$(function(){
    var roomname = $("#roomname").text();
    var socket = io.connect('http://localhost:5000/'+roomname);
    var socket = io.connect('http://localhost:5000/doctor/dashboard');
     console.log(roomname);
})