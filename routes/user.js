var express             = require("express"),
    router              = express.Router({mergeParams:true}),
    doctorUser          = require("../models/Doctor"),
    flash               = require("connect-flash");
   
 var uname,mobile; 

router.post("/user/login",function(req,res){
    uname=req.body.username;
    mobile=req.body.mnumber;
    res.redirect("/user/profile");
});
router.get("/user/profile",isUserLogged, function(req,res){
    console.log("user page");
    res.render("./User/user");
});

router.get("/user/login",function(req,res){
    console.log("User login page");
    res.render("./User/Login");
})
router.get("/:id",isUserLogged,function(req,res){

    doctorUser.findOne({userid:req.params.id},function(err,doctor){
        if(err){
            
            console.log('error in wait');
            console.log(err);
            req.flash(err);

            res.redirect("/");
        }
        else if(doctor==null){
            req.flash("error","No such doctor exist");
            res.redirect("/user/login");
        }
        else{
            console.log("waiting room");
            res.render("./User/wait",{doctordetail:doctor});
        }
    })
});
function isUserLogged(req,res,next){
    if(uname!=null && mobile!=null){
        console.log("user middleware");
        return next();
    }
    else{
        req.flash("error","Please Create a user acount first")
        res.redirect("/user/login");
    }
}

module.exports = router;