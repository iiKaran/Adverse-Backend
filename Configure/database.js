const mongoose = require('mongoose'); 

require("dotenv").config(); 
const makeConnection = ()=>{
   mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Db Connected Succesfully")
   }).catch((err)=>{
    console.log("Error Occur While Connecting To db", err);
   })
}
module.exports= makeConnection;