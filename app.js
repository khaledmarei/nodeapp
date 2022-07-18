//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin:admin@cluster0.onq5l.mongodb.net/khaled?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  Number: String,
  password: String,
  age:Number,
  

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render('singup&in&password/singIn', {});
});

app.get("/singUp", function(req, res){
  res.render("singup&in&password/singUp");
});





app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.post("/singUp", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
      console.log(req.user)
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    }
  });

});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
        console.log(req.user);
      });
    }
  });

});





// /posts&courses/blog-search
app.get('/blog', function(req, res){
  res.render('posts&courses/blog-search', {});
})
app.post('/blog', function(req, res){
  res.send('This is homePage POST!');
})




// /find/FindContractor
app.get('/find/work', function(req, res){
  res.render('find/FindContractor', {});
})
app.post('/find/work', function(req, res){
  res.send('This is homePage POST!');
})




// /account/account-general
app.get('/account/general', function(req, res){
  
  if(req.isAuthenticated()){
    res.render('account/account-general')}else{
      res.redirect(
    "/login"
      )
    }

  
  
})
app.post('/account/general', function(req, res){
  res.send('This is homePage POST!');
})

// /account/account-security
app.get('/account/account-security', function(req, res){
  res.render('account/account-security', {});
})
app.post('/account/account-security', function(req, res){
  res.send('This is homePage POST!');
})

// /account/account-notifications
app.get('/account/notifications', function(req, res){
  res.render('account/account-notifications', {});
})
app.post('/account/notifications', function(req, res){
  res.send('This is homePage POST!');
})





// /singup&in&password/singIn
app.get('/login', function(req, res){
  res.render('singup&in&password/singIn', {});


})

    

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.number,
    password: req.body.password
  });
console.log(user);
  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });

});




// /singup&in&password/singUp
app.get('/singup', function(req, res){
  
  res.render('singup&in&password/singUp', {});
})
app.post('/singup', function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/singup");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/singup");
        });
      }
    });})


// /singup&in&password/getPassword
app.get('/getPassword', function(req, res){
  res.render('singup&in&password/getPassword', {});
})
app.post('/getPassword', function(req, res){
  res.send('This is homePage POST!');
})




// /account/profile
app.get('/account/profile', function(req, res){
  res.render('account/profile', {});
})
app.post('/account/profile', function(req, res){
  res.send('This is homePage POST!');
})





// /find/FindWorker
app.get('/find/FindWorker', function(req, res){
  res.render('find/FindWorker', {});
})
app.post('/find/FindWorker', function(req, res){
  res.send('This is homePage POST!');
})





// /posts&courses/Posts
app.get('/Posts', function(req, res){
  res.render('posts&courses/Posts', {});
})
app.post('/Posts', function(req, res){
  res.send('This is homePage POST!');
})




// /singup&in&password/getFirstData
app.get('/singup/data', function(req, res){
  res.render('singup&in&password/getFirstData', {});

  

})
app.post('/singup/data', function(req, res){
  res.send('This is homePage POST!');
})



app.get('/gg' , (req , res )=>{
if(req.isAuthenticated()){
  res.send(req.user)
}else
res.send('fuck')

})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
