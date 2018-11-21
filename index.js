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

app.listen(3000,function(){
    console.log("It's on 3000");
});


