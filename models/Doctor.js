var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var doctorSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    userid:String,
    mobile:Number,
    // username:s,
    // email:string,

});

doctorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Doctor", doctorSchema);