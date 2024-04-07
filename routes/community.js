const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")



const communitySchema = mongoose.Schema({
review:String,
   reviewImage:String,
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
   like:{
    type:Number,
    default:0,
  
},
})
communitySchema.plugin(plm)
module.exports = mongoose.model("community",communitySchema)
