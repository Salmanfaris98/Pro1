$(function(){
    var $roomname     = $("#roomname").text(),
        $username     = $("#Username").text(),
        $mobile       = $("#mob").text(),
        $messageForm = $('#messageForm'),
        $message = $('#message'),
        $chat = $('#chat');
    //     userSend     = $("#userSend"),
    //     userMessage  = $("#userMessage"),
       // var roomID = window.location.pathname.splitOnLast("/")[1]; //Should ideally be got from req.params.roomid
        

       var socket      = io.connect();
       $(document).ready(function() {
        
        socket.emit('new userLogged',$roomname,$username,$mobile);
       });
   
       
       $messageForm.submit(function(e){
        e.preventDefault();
        console.log("Submitted.")
        //emit message data
        socket.emit('send message', $message.val(),$username);
        //clear message div once emitted
        $message.val('');
      })

      socket.on('Whisper', function(data){
        $chat.append(' <div class="wis"> <strong>'+data.user+": "+'</strong>' + data.msg + ' </div> ')
      });

      socket.on('new message', function(data){
        $chat.append(' <div class="well"> <strong>'+data.user+": "+'</strong>' + data.msg + ' </div> ')
      });
    
})