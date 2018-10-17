var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    username                                    ,
    mobile                                      ,
    Doctorname                                  ,
    DoctorPass,
    roomname,
    demail;
    // mongoose            = require("mongoose");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

// mongoose.connect("mongodb://localhost:27017/");

// var campgroundSchema = new mongoose.Schema({
//     name:String,
//     image:String,
//     description:String
// });

app.get("/",function(req,res){
    res.render("index",{username:null,doctorname:null});
});

app.post("/login",function(req,res){
    username=req.body.username;
    mobile=req.body.mobile;
    res.redirect("/user");
});

app.get("/user",function(req,res){
    res.render("user",{username:username,doctorname:null});
});
app.get("/doctors",function(req,res){
    res.render("doctor",{username:username,doctorname:Doctorname});
});
app.post("/doctor-login",function(req,res){
    Doctorname=req.body.first_name+" "+ req.body.last_name;
    DoctorPass=req.body.password;
    demail=req.body.email;
    roomname=req.body.roomname;
    res.redirect("/doctor-dash");
});

app.get("/doctor-dash",function(req,res){
    res.render("doctor-dash",{username:null,doctorname:Doctorname,roomname:roomname});
});
app.listen(3000,function(){
    console.log("It's on 3000");
});