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
    userName        =[],
    userMobile      =[],
    doctorcount     =[];

   
    io.of('/').on("connection",function(socket){
        socket.on("join", function(roomid,username,mobile){
            socket.join(roomid);
            userName.push(username);
            userMobile.push(mobile);
            usercount.push(socket);
            console.log('User count  %s',usercount.length);
        socket.on('disconnect',function(data){
            usercount.splice(usercount.indexOf(socket),1);
            console.log('User count   %s',usercount.length);
    
        });
    
        });
        
    });
    io.of('/doctor/dashboard').on("connection",function(socket){
        doctorcount.push(socket);
        console.log('Doctor count  %s',doctorcount.length);
    
        console.log(userName);
        console.log(userMobile);
        
        io.sockets.emit('connected user',{user:userName});
        socket.on('disconnect',function(data){
            doctorcount.splice(doctorcount.indexOf(socket),1);
            console.log('Doctor count   %s',doctorcount.length);
    
        });
        
    });

