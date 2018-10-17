var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    username                                    ,
    mobile                                      ,
    Doctor= [{name:"Dr.Afna",
             pass:"hello123"},
             {name:"Dr.Aslam",
             pass:"hell1234"},
             {name:"Dr.Fasil",
             pass:"helllo124"},
             {name:"Dr.Zehra",
             pass:"helloo1234"},
             {name:"Admin",
             pass:"admin123"},
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

app.post("/user",function(req,res){
    username=req.body.username;
    mobile=req.body.mobile;
    res.redirect("/user");
});

app.get("/user",function(req,res){
    res.render("user",{username:username,doctor:Doctor});
});
app.get("/doctor-signup",function(req,res){
    res.render("doctor-signup",{username:username});
});
app.post("/doctor-signup",function(req,res){
    var Doctorname=req.body.name;
    var DoctorPass=req.body.password;
    var newDoctor={name:Doctorname, pass:DoctorPass}
    Doctor.push(newDoctor);
    res.redirect("/doctor-dash");
});
app.get("/doctor-login",function(req,res){
    res.render("doctor-login",{username:null});
});
app.post("/doctor-login",function(req,res){
    var DoctorPass=req.body.doctorpass;
    var Doctorname=req.body.doctorname;
    res.redirect("/doctor-dash");
});
app.get("/doctor-dash",function(req,res){
    res.render("doctor-dash",{username:null,doctorname:Doctor.name});
});
app.get("/logout",function(req,res){
    username:null;
    doctorname:null;
    res.redirect("/");
});
app.listen(3000,function(){
    console.log("It's on 3000");
});