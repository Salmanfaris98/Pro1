var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var doctorSchema = new mongoose.Schema({
    name:String,
    password:String
    // username:s,
    // email:string,

});

doctorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Doctor", doctorSchema);