const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    title:{
        type: String , 
        trim : true , 
        require: true
    },
    image:{
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
        default: function() {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3);
            return currentDate;
        }
    },
    status:{
        type:Boolean, 
        default:true
    }
});

module.exports = mongoose.model("AD", adSchema);