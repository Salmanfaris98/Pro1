var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    username                                    ,
    mobile;
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
    res.render("index");
});

app.post("/login",function(req,res){
    username=req.body.username;
    mobile=req.body.mobile;
    res.redirect("/user");
});

app.get("/user",function(req,res){
    res.render("user",{username:username});
});
app.listen(3000,function(){
    console.log("It's on 3000");
});