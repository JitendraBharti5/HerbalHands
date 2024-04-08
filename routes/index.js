var express = require('express');
var router = express.Router();
const userModel  = require("./users")
const communityModel = require("./community")
const remedieModel  = require("./remedie")
const upload = require("./multer")
const passport = require("passport")
const localStrategy = require("passport-local");
const community = require('./community');

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
router.get('/remedie',isLoggedIn,  async function(req, res, next) {
  res.render('remedie.ejs' );
});
router.get('/createRemedie',isLoggedIn,  async function(req, res, next) {
  res.render('createRemedie.ejs' );
});

router.get('/remedieSarch',isLoggedIn,  async function(req, res, next) {
  res.render('remedieSarch.ejs' );
});
router.get('/community',isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  const common  = await  communityModel.find({}).populate("user")

// console.log("Modified Like Array Length:", common.like.length);

  res.render('community.ejs',{common,user} );
});

router.get('/profile',isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  }).populate("post")
  
  const remedie = await remedieModel.find({})


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
router.post('/sharereview',isLoggedIn,upload.single("image"), async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })

const community = await communityModel.create({
  review : req.body.review,
  reviewImage:req.file.filename
})
res.redirect("/community")
})

router.get("/searchUser/:name",async function(req, res, next){
try {
  var data = req.params.name
  const allUser = await remedieModel.find({
    remedieName:{
      $regex:data,
      $options:"i"
    }
  })
  
  res.status(200).json(allUser)
} catch (error) {
  console.log(error);
}
})

router.get("/like/:id",isLoggedIn,async function(req,res,next){
  // console.log(req.params.id);
  const user = await userModel.findOne({username:req.session.passport.user})
  const common  = await communityModel.findOne({_id:req.params.id});

  
if(common.like.indexOf(user._id) === -1) {
  common.like.push(user._id);

}
else{
 let index =  common.like.indexOf(user._id) 
 common.like.splice(index, 1);
}
await common.save();

console.log("Modified Like Array Length:", common.like.length);

// res.render("community",{user,common})
      res.redirect("/community")
     })

router.get("/get/all",async function(req, res, next){
  try {
    const allUser = await remedieModel.find();
    
    res.status(200).json(allUser)
  } catch (error) {
    console.log(error);
  }
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
