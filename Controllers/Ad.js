const User = require("../Models/User");
const Ad= require("../Models/Ad");
const Otp = require("../Models/Otp");
exports.createAd= async (req, res)=>{
   try{
    const { title, description, by, place, validTill } = req.body;
    
    if(!title || ! description || !place)
    {
        return res.status(400).json({
            success: false , 
            message:'error while creating ad'
        })
    }
    const ad = new Ad({ title, description, place, by});
    await ad.save();

    const updatedUser = await User.findByIdAndUpdate({_id:by},{$push:{ads:ad._id}});
  
    res.status(201).json(ad);
   }
   catch(err){
    console.log("Error Occured While Creating Ad",err); 
    return res.status(500).json({
        success:false, 
        message:"Error while creating ad in"
    })
   }
}
exports.deleteAd =  async (req, res) => {
    try {
     const {id}= req.body ;
      const ad = await Ad.findByIdAndDelete(id);
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      // await ad.remove();
      return res.json({ message: "Ad deleted successfully" });
    } catch (err) {
     return  res.status(500).json({ message: err.message });
    }
}
exports.getAdds =  async (req, res) => {
  try {
   const {id}= req.body ;
   console.log("the add req is ", req.body)
    const ad = await User.findById(id).populate({
      path: "ads",
      populate: {
       path: "by"}});
    if (!ad) {
      return res.status(404).json({ message: "No AD found" });
    }
   return res.status(200).json({
    success:true, 
    message:"Add Fetched Succesfully", 
    data: ad?.ads
   })

  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
}
