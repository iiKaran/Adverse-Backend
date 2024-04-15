const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      name:{
        type:String , 
        trim : true ,
      }, 
      email:{
        type:String , 
        trim : true ,
      }, 
      type:{
        type:String, 
        enum :['Advertiser', 'user','advertiser']
      },
      ads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AD'
      }], 
      password:{
        type:String , 
        trim : true ,
      }
});

module.exports = mongoose.model("User", userSchema);