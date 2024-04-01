const User = require("../Models/User");
const Ad= require("../Models/Ad");
const Otp = require("../Models/Otp");


exports.createAd= async (req, res)=>{
   try{
    const { title, description, by, place, validTill } = req.body;
    if(!title || ! description || !by || !place || !validTill)
    {
        return res.status(400).json({
            success: false , 
            message:'error while creating ad'
        })
    }
    const ad = new Ad({ title, description, by, place, validTill });
    await ad.save();
    res.status(201).json(ad);
   }
   catch(err){
    console.log("Error Occured While Creating Ad",err); 
    return res.status(500).json({
        success:false, 
        message:"Error while logging in"
    })
   }
}

exports.deleteAd =  async (req, res) => {
    try {
     const {id}= req.body ;
      const ad = await Ad.findById(id);
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      await ad.remove();
      res.json({ message: "Ad deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}
  
  