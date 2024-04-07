const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")



const remedieSchema = mongoose.Schema({
 remedieName:String,
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
   ingredients:String,
   dosage:String,
   description:String,
   image:String,
})
remedieSchema.plugin(plm)
module.exports = mongoose.model("remedie",remedieSchema)
