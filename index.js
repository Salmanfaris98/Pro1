var express             = require("express"),
    app                 = express(),
    bCrypt              = require('bcrypt'),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    doctorUser              = require("./models/Doctor");
    
    
    //mongoose.connect("mongodb://localhost:27017/InstaDoc");
    mongoose.connect("mongodb://beat:beat123@ds211592.mlab.com:11592/instadoc");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



//passport configuration
app.use(require("express-session")({
    secret:"This is a secret so Shush",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(doctorUser.serializeUser());
passport.deserializeUser(doctorUser.deserializeUser());

// passport login logic
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }

passport.use("login",new LocalStrategy(
    {    passReqToCallback : true
    }, function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    doctorUser.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                // req.flash('message', 'User Not found.')
                );                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
            //   req.flash('message', 'Invalid Password')
              );
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );}));

//Passport sign up logic

passport.use("signup", new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      doctorUser.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false, 
            //  req.flash('message','User Already Exists')
            );
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new doctorUser();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.param('email');
          newUser.userid = req.param('userid');
          newUser.mobile  = req.param('mobile');

          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
   }


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});



app.get("/",function(req,res){
    res.render("index");
});

app.post("/user",function(req,res){
    res.redirect("/user");
});

app.get("/user",function(req,res){
    res.render("user");
});
app.get("/doctor/signup",function(req,res){
    res.render("doctor-signup");
});
app.post("/doctor/signup",passport.authenticate('signup', {
    successRedirect: "/doctor/dash",
    failureRedirect:"/doctor/signup",
    failureFlash : true 
  }));
  
  
  app.get("/doctor/login",function(req,res){
    res.render("doctor-login",{username:null});
});
app.post("/doctor/login",passport.authenticate("login", 
    {successRedirect:"/doctor/dash", 
    failureRedirect:'/doctor/login',
    failureFlash: true})
, function(req,res){
});
app.get("/doctor/dash",isLoggedIn,function(req,res){
    doctorUser.findById(req.params.id,function(err,doctor){
        if(err){
            console.log(err);
        } else {
            res.render("doctor-dash",{currentUser:req.user});
        }

    });
});
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/doctor/login");
}
app.listen(3000,function(){
    console.log("It's on 3000");
});


