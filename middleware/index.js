 
 var middlewareObject ={};

 middlewareObject.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Doctor Please Login First")
    res.redirect("/doctor/login");
} 

//won't work until user database is set
middlewareObject.isUserLogged=function(req,res,next){
    if(uname!=null && mobile!=null){
        console.log("user middleware");
        return next();
    }
    else{
        req.flash("error","Please Create a user acount first")
        res.redirect("/");
    }
}



 module.exports=middlewareObject;