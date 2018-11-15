var express             = require("express"),
    router              = express.Router({mergeParams:true}),
    doctorUser          = require("../models/Doctor"),
    flash               = require("connect-flash"),
    passport            = require("passport")
    middleware          = require("../middleware");

router.get("/doctor/signup",function(req,res){
    res.render("./Doctor/Signup");
});
router.post("/doctor/signup",passport.authenticate('signup', {
    successRedirect: "/doctor/dash",
    failureRedirect:"/doctor/signup",
    failureFlash : true 
  }));
  
  
  router.get("/doctor/login",function(req,res){
    res.render("./Doctor/Login",{username:null});
});
router.post("/doctor/login",passport.authenticate("login", 
    {successRedirect:"/doctor/dash", 
    failureRedirect:'/doctor/login',
    failureFlash: true}),
     function(req,res){
});
router.get("/doctor/dash",middleware.isLoggedIn,function(req,res){
    doctorUser.findById(req.params.id,function(err,doctor){
        if(err){
            console.log(err);
        } else {
            console.log("DASHBOARD");
            res.render("./Doctor/Dashboard",{currentUser:req.user});
        }

    });
});


router.get("/doctor/logout",function(req,res){
    req.logout();
    req.flash('success','Bye..');
    // req.session.destroy();
    res.redirect("/");
});

module.exports = router;