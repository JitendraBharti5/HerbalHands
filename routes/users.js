const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/sis")

const userSchema = mongoose.Schema({
Username:String,
email:String,
password:String,
post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"remedie"
   },
   gender:String

    
})
userSchema.plugin(plm)
module.exports = mongoose.model("user",userSchema)
