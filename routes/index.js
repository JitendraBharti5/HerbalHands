var express = require('express');
var router = express.Router();
const userModel  = require("./users")

const remedieModel  = require("./remedie")
const upload = require("./multer")
const passport = require("passport")
const localStrategy = require("passport-local");

passport.use(new localStrategy (userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' );
});

router.get('/home',isLoggedIn , async function(req, res, next) {
const user = await userModel.findOne({
  username:req.session.passport.user
})

res.send(user.username)
});




router.post("/register",async function(req,res,next ){
  var userdata = new userModel({
    username :req.body.username,
    email:req.body.email,
    category:req.body.category,
    secret:req.body.secret
  })
 
  
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/home")
  
    })
  })
})

 
router.post("/login" , passport.authenticate("local",{
  successRedirect:"/home",
  failureRedirect:"/"

}),function(req,res){ 
})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err) return next(err)
    res.redirect("/")
  })
})


function isLoggedIn(req,res,next){
if(req.isAuthenticated ()){
  return next()
}
res.redirect("/")
}

module.exports = router;
