var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    username                                    ,
    mobile                                      ,
    Doctor= [{name:"Afna",
             pass:"hello123"},
             {name:"Rizwan",
             pass:"hell1234"},
             {name:"Prasanth",
             pass:"helllo124"},
             {name:"Abhishek",
             pass:"helloo1234"},
             {name:"Enrique",
             pass:"12345678"},
              ]                  ;
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
    res.render("index",{username:null});
});

app.post("/login",function(req,res){
    username=req.body.username;
    mobile=req.body.mobile;
    res.redirect("/user");
});

app.get("/user",function(req,res){
    res.render("user",{username:username,doctor:Doctor});
});
app.get("/doctors",function(req,res){
    res.render("doctor",{username:username});
});
app.post("/doctor-login",function(req,res){
    var Doctorname=req.body.name;
    var DoctorPass=req.body.password;
    var newDoctor={name:Doctorname, pass:DoctorPass}
    Doctor.push(newDoctor);
    res.redirect("/doctor-dash");
});
app.get("/doctor-login",function(req,res){
    res.render("doctor-login",{username:null});
});
app.post("/doctor-dash",function(req,res){
    var DoctorPass=req.body.doctorpass;
    var Doctorname=req.body.doctorname;
    res.redirect("/doctor-dash");
});
app.get("/doctor-dash",function(req,res){
    res.render("doctor-dash",{username:null,doctorname:Doctor.name});
});
app.listen(3000,function(){
    console.log("It's on 3000");
});