var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    doctorUser              = require("./models/Doctor");
    
    
    mongoose.connect("mongodb://localhost:27017/InstaDoc");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



//passport configuration
app.use(require("express-session")({
    secret:"This is a secret so Shush",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(doctorUser.authenticate()));
passport.serializeUser(doctorUser.serializeUser());
passport.deserializeUser(doctorUser.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});



app.get("/",function(req,res){
    res.render("index");
});

app.post("/user",function(req,res){
    res.redirect("/user");
});

app.get("/user",function(req,res){
    res.render("user");
});
app.get("/doctor/signup",function(req,res){
    res.render("doctor-signup");
});
app.post("/doctor/signup",function(req,res){
    var details={roomname:req.body.roomname, email : req.body.email};
    var Doctorname=new doctorUser({username: req.body.username}) ;
    doctorUser.register(Doctorname,req.body.password,function(err,user){
        if(err){
            console.log(err)
            return res.render("doctor-signup");
        }
        passport.authenticate("local")(req,res,function(){
            user.push(details);
            user.save();
            console.log(user);
            res.redirect("/doctor/dash");
        });
    });
});
app.get("/doctor/login",function(req,res){
    res.render("doctor-login",{username:null});
});
app.post("/doctor/login",passport.authenticate("local", 
    {successRedirect:"/doctor/dash", 
    failureRedirect:"/doctor/login",
    failureFlash: 'Invalid username or password.'})
, function(req,res){
});
app.get("/doctor/dash",isLoggedIn,function(req,res){
    doctorUser.findById(req.params.id,function(err,doctor){
        if(err){
            console.log(err);
        } else {
            res.render("doctor-dash",{currentUser:req.user});
        }

    });
});
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/doctor/login");
}
app.listen(3000,function(){
    console.log("It's on 3000");
});


