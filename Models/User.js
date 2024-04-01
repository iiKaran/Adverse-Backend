const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      name:{
        type:String , 
        trim : true ,
      }, 
      contact:{
        type:String , 
        trim : true ,
      }, 
      type:{
        type:String, 
        enum :['advertiser', 'user']
      },
      ads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AD'
      }]
});

module.exports = mongoose.model("User", userSchema);