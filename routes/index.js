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

router.get("/back",function(req,res,next){
  res.redirect("/home")
})
router.get('/home',isLoggedIn , async function(req, res, next) {
const user = await userModel.findOne({
  username:req.session.passport.user
}).populate("post")
const remedie = await remedieModel.find({});

res.render("home.ejs",{user,remedie})
});
router.get('/product',isLoggedIn,  async function(req, res, next) {
  res.render('product.ejs' );
});
router.get('/createRemedie',isLoggedIn,  async function(req, res, next) {
  res.render('createRemedie.ejs' );
});

router.get('/remedieSarch',isLoggedIn,  async function(req, res, next) {
  res.render('remedieSarch.ejs' );
});
router.get('/community',isLoggedIn,  async function(req, res, next) {
  res.render('community.ejs' );
});

router.get('/profile',isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  }).populate("post")
  
  const remedie = await remedieModel.find({})
  
  console.log(user)
  console.log(remedie)

// res.send(user)
  res.render('profile.ejs',{user,remedie} );
});

router.get('/remedieSearch',isLoggedIn,  async function(req, res, next) {

  const user = await userModel.findOne({
    username:req.session.passport.user
  }).populate("post")
  const remedie = await remedieModel.find({})
  // console.log()

  res.render('remedieSearch.ejs',{user,remedie} );
});

router.post('/remedieCreate',isLoggedIn,upload.single("image"), async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
const remedie = await remedieModel.create({
  remedieName:req.body.remedieName,
   ingredients:req.body.ingredients,
   dosage:req.body.dosage,
   description:req.body.description,
   image:req.file.filename,
})

remedie.user = user._id;
user.post.push(remedie._id);

await user.save();
await remedie.save();

res.redirect("/home");

});
router.post("/searchUser",async function(req, res, next){
  const data = req.body.data
  const allUser = await remedieModel.find({
    remedieName:{
      $regex:data,
      $options:"i"
    }
  })
  
  res.status(200).json(allUser)
})




router.post("/register",async function(req,res,next ){
const userdata = new userModel({
    username :req.body.username,
    email:req.body.email,
    gender:req.body.gender
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
