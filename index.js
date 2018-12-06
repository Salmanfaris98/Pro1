var express             = require("express"),
    app                 = express(),
    bCrypt              = require('bcrypt'),
    bodyParser          = require("body-parser"),
    flash               = require("connect-flash"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override")
    doctorUser          = require("./models/Doctor"),
    doctorRoute         = require("./routes/doctor"),
    indexAuthRoute      = require("./routes/index"),
    userRoute           = require("./routes/user");
    const PORT = process.env.PORT || 5000    
    
    //mongoose.connect("mongodb://beat:beat123@ds211592.mlab.com:11592/instadoc");
    mongoose.connect("mongodb://localhost:27017/InstaDoc");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/routes'));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"This is a secret so Shush",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(doctorUser.serializeUser());
passport.deserializeUser(doctorUser.deserializeUser());
app.use(flash()); 
app.use(function(req,res,next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});
app.use(indexAuthRoute);

app.use(doctorRoute);
app.use(userRoute);

server=app.listen(PORT);

const io = require("socket.io")(server);
var usercount       =[],
    // userDetail      =[{roomname[{
    //                     username,
    //                     mobile    }]}],
    username        =[],
    usermobile      =[],
    roomname        =[],
    connections     =[],
    doctor          =[];

   
    io.sockets.on("connection",function(socket){
        // socket.on("join", function(roomid,username,mobile){
        //     socket.join(roomid);
        //     userName.push(username);
        //     userMobile.push(mobile);
        //     usercount.push(socket);
        //     console.log('User count  %s',usercount.length);
        // socket.on('disconnect',function(data){
        //     usercount.splice(usercount.indexOf(socket),1);
        //     console.log('User count   %s',usercount.length);
    
        // });
    
        // });
        connections.push(socket);
        console.log('connected: %s sockets connected', connections.length);
        socket.on('new userLogged', function(room,user,mobile){
            // console.log(room);
            console.log("user connected");
            // console.log(mobile);
            // console.log("new user");
            socket.username = user;
            socket.usermobile = mobile;
            socket.room = room;

            roomname.push(socket.room);
            username.push(socket.username);
            usermobile.push(socket.usermobile);
            // updateUsernames()
            updateUsernames()

          });

          socket.on('new doctorLogged',function(data){   
            console.log("Doctor connected");
              socket.doctorName = data;
              doctor.push(socket.doctorName);
            updateUsernames()

           
          });

          socket.on('disconnect',function(data){
              console.log(data);
                roomname.splice(roomname.indexOf(socket.roomname), 1);
                username.splice(username.indexOf(socket.username), 1);
                usermobile.splice(usermobile.indexOf(socket.usermobile), 1);
            
                    doctor.splice(doctor.indexOf(socket.doctorName),1);
     
                console.log(doctor);
                connections.splice(connections.indexOf(socket), 1);
                console.log("Disconnected: %s sockets Disconnected", connections.length);
                updateUsernames()
 
          });
          socket.on('send message', function(message,user){
            console.log(user)
            io.sockets.emit('new message', {msg: message, user:user});
          });
        
          function updateUsernames(){
            
            io.sockets.emit('get users', username);
            
          }
    });
 
