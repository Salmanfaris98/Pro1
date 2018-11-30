var express             = require("express"),
    router              = express.Router({mergeParams:true}),
    doctorUser          = require("../models/Doctor"),
    flash               = require("connect-flash");
   

// get(id-->findbyid(middleware)-->loginpage)
// post(:id-->/id (doctor,user,mobile)) 
router.get("/:id",isDoctorCheck,function(req,res){
    console.log("Login form");
   res.render("./User/Login",{doctorDetail:req.session.doctor});
 
});

router.post("/:id",function(req,res){
    req.session.username    = req.body.username;
    req.session.mobile      = req.body.mnumber;
    doctorUser.findOne({userid:req.params.id},function(err,doctor){
        if(err){
            console.log(err);
            req.flash('error','Error while logging in');
            res.redirect("/");
        }
        else{
            console.log("waiting room");
            req.session.doctor = doctor;
            res.render("./User/wait",{doctordetail:req.session.doctor,username:req.session.username,mobile:req.session.mobile});
        }
    });

});

function isDoctorCheck(req,res,next){
    doctorUser.findOne({userid:req.params.id},function(err,doctor){
        if(err){
            console.log(err);
            req.flash('error','Error while loading');
            res.redirect("/");
        }
        else if(doctor==null)
        {
            req.flash('error','Error No such doctor exist');
            res.redirect("/");  
        }
        else{
            console.log("Doctor check middleware");
            req.session.doctor = doctor;
            return next();
        }
    });
}
module.exports = router;