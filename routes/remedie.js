const  mongoose = require("mongoose")

const plm = require("passport-local-mongoose")



const remedieSchema = mongoose.Schema({
   image:String,
   name:String,
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }

    
})
remedieSchema.plugin(plm)
module.exports = mongoose.model("remedie",remedieSchema)
