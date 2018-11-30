$(function(){
    var roomname     = $("#roomname").text(),
        username     = $("#Username").text(),
        mobile       = $("#mob").text(),
        userDetail   = $('#userdetail').text;     
    //     userSend     = $("#userSend"),
    //     userMessage  = $("#userMessage"),
       // var roomID = window.location.pathname.splitOnLast("/")[1]; //Should ideally be got from req.params.roomid
        

    var user = io.connect('http://localhost:5000/');
    user.emit("join",roomname,username,mobile);
    //user.emit("newUser",{username});
    user.emit("message","User from userapge");
    user.on('connected user',function(data){
        console.log(data);
        userDetail.append('<li>data</li>')
    });

})