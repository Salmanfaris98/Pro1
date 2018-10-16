var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser");
    // mongoose            = require("mongoose");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
// mongoose.connect("mongodb://localhost:27017/");

// var campgroundSchema = new mongoose.Schema({
//     name:String,
//     image:String,
//     description:String
// });
