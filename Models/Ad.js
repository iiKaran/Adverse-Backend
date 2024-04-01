const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    title:{
        type: String , 
        trim : true , 
        require: true
    },
    description:{
        type: String , 
        trim : true , 
        require: true
    }, 
    by:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
        // by 
    },
    date:{
        type: Date , 
        default: Date.now(),
    },
    place:{
        type: String , 
        trim : true 
    },
    validTill :{
        type: Date , 
        default: Date.now()*24*60*60*1000,
    },
    status:{
        type:Boolean, 
        default:true
    }
});

module.exports = mongoose.model("AD", adSchema);